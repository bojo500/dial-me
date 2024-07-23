import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import * as Twilio from 'twilio';
import { twiml } from "twilio";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Otp } from "./entities";
import { UsersService } from "../users/users.service";

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


  async makeCall(to: string, from: string, url: string): Promise<string> {
    const call = await this.client.calls.create({
      to,
      from,
      url,
    });
    return call.sid;
  }

  createHangupResponse(): string {
    const response = new twiml.VoiceResponse();
    response.hangup();
    return response.toString();
  }


  async createCall(to: string, url: string): Promise<string> {
    try {
      const call = await this.client.calls.create({
        from: this.fromPhoneNumber,
        to,
        url,
      });
      return call.sid;
    } catch (error) {
      this.logger.error(`Failed to create call: ${error.message}`);
      throw new Error(`Failed to create call: ${error.message}`);
    }
  }


  async sendOtp(userId: number, phoneNumber: string): Promise<void> {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
      await this.usersService.updatePhoneNumberAndOtp(userId, phoneNumber, otp);

      await this.client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: this.fromPhoneNumber,
        to: phoneNumber,
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }

  async verifyOtp(userId: number, otp: string): Promise<boolean> {
    const otpRecord = await this.usersService.findOneByOtp(otp);
    if (!otpRecord) {
      throw new NotFoundException('Invalid OTP');
    }
    await this.usersService.updatePhoneNumberAndOtp(userId, otpRecord.phoneNumber, otpRecord.otp);
    return true;
  }


}

