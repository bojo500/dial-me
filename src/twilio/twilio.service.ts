import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import Twilio from 'twilio';
import { twiml } from "twilio";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Otp } from "./entities";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class TwilioService {
  private readonly logger = new Logger(TwilioService.name);
  private client: Twilio.Twilio;
  private readonly fromPhoneNumber: string;

  constructor(
    @InjectRepository(Otp)
    private otpRepo: Repository<Otp>,
    private usersService: UsersService,
  ) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    this.logger.debug(`TWILIO_ACCOUNT_SID: ${accountSid}`);
    this.logger.debug(`TWILIO_AUTH_TOKEN: ${authToken ? 'Set' : 'Not Set'}`);
    this.logger.debug(`TWILIO_PHONE_NUMBER: ${this.fromPhoneNumber}`);
    if (!accountSid || !authToken || !this.fromPhoneNumber) {
      throw new Error('Twilio credentials are not set in environment variables');
    }
    this.client = Twilio(accountSid, authToken);
  }

  async makeCall(to: string, from: string, url: string): Promise<string> {
    try {
      const call = await this.client.calls.create({ to, from, url });
      return call.sid;
    } catch (error) {
      console.error('Twilio makeCall error:', error);
      throw new Error('Failed to make call');
    }
  }

  createHangupResponse(): string {
    const response = new twiml.VoiceResponse();
    response.hangup();
    return response.toString();
  }

  async sendSms(to: string, body: string): Promise<string> {
    try {
      const message = await this.client.messages.create({
        body,
        from: this.fromPhoneNumber,
        to,
      });
      return message.sid;
    } catch (error) {
      this.logger.error(`Failed to send SMS: ${error.message}`);
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }
  async sendOtp(userId: number, phoneNumber: string): Promise<void> {
    try {
      await this.otpRepo.update({ userId }, { deletedAt: new Date() });
      const plainOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOtp = await bcrypt.hash(plainOtp, 10);
      const otpEntity = this.otpRepo.create({ phoneNumber, otp: hashedOtp, userId });
      await this.otpRepo.save(otpEntity);
      await this.client.messages.create({
        body: `Your OTP code is ${plainOtp}`,
        from: this.fromPhoneNumber,
        to: phoneNumber,
      });
    }
    catch (error) {throw new Error('Failed to send OTP');}
  }
  async verifyOtp(userId: number, otp: string): Promise<boolean> {
    const otpRecord = await this.otpRepo.findOne({ where: { userId, deletedAt: null } });
    if (!otpRecord) {throw new NotFoundException('OTP not found or expired');}
    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isOtpValid) {throw new NotFoundException('Invalid OTP');}
    await this.usersService.updatePhoneNumber(userId, otpRecord.phoneNumber);
    await this.otpRepo.remove(otpRecord);
    return true;
  }

}

