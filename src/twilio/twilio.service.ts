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
  private readonly client: Twilio.Twilio;
  private readonly fromPhoneNumber: string;

  constructor(
      @InjectRepository(Otp)
      private otpRepo: Repository<Otp>,
      private usersService: UsersService,
  ) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !this.fromPhoneNumber) {
      throw new Error('Twilio credentials are not set in environment variables');
    }

    this.client = Twilio(accountSid, authToken);

    this.logger.debug(`TWILIO_ACCOUNT_SID: ${accountSid}`);
    this.logger.debug(`TWILIO_AUTH_TOKEN: ${authToken ? 'Set' : 'Not Set'}`);
    this.logger.debug(`TWILIO_PHONE_NUMBER: ${this.fromPhoneNumber}`);
  }

  public generateAccessToken(identity: string): string {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKeySid = process.env.TWILIO_API_KEY_SID;
    const apiSecret = process.env.TWILIO_API_SECRET;

    if (!accountSid || !apiKeySid || !apiSecret) {
      throw new Error('Twilio API Key SID or API Secret is not set in environment variables');
    }

    const token = new Twilio.jwt.AccessToken(
        accountSid,
        apiKeySid,
        apiSecret,
        {
          identity: identity,
          ttl: 3600 // Token time-to-live in seconds
        }
    );

    const voiceGrant = new Twilio.jwt.AccessToken.VoiceGrant({
      incomingAllow: true,
    });
    token.addGrant(voiceGrant);

    return token.toJwt();
  }

  async makeCall(to: string, from: string, url: string): Promise<string> {
    try {
      const call = await this.client.calls.create({ to, from, url });
      return call.sid;
    } catch (error) {
      this.logger.error('Twilio makeCall error:', error);
      throw new Error('Failed to make call');
    }
  }

  async generateToken(identity: string): Promise<string> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKeySid = process.env.TWILIO_API_KEY_SID;
    const apiSecret = process.env.TWILIO_API_SECRET;

    if (!accountSid || !apiKeySid || !apiSecret) {
      throw new Error('Twilio API Key SID or API Secret is not set in environment variables');
    }

    const token = new Twilio.jwt.AccessToken(
        accountSid,
        apiKeySid,
        apiSecret,
        {
          identity: identity,
          ttl: 3600 // Token time-to-live in seconds
        }
    );

    const grant = new Twilio.jwt.AccessToken.VideoGrant();
    token.addGrant(grant);

    return token.toJwt();
  }

  async hangupCall(callSid: string): Promise<void> {
    try {
      await this.client.calls(callSid).update({ status: 'completed' });
    } catch (error) {
      this.logger.error('Twilio hangupCall error:', error);
      throw new Error('Failed to hang up call');
    }
  }

  generateTwiMLResponse(): string {
    const response = new twiml.VoiceResponse();
    response.say('This is a test call');
    response.dial({
      answerOnBridge: true,
    }).client('client-name'); // The client name should match with the frontend client name
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
      if (error instanceof Error) {
        this.logger.error(`Failed to send SMS: ${error.message}`);
        throw new Error(`Failed to send SMS: ${error.message}`);
      } else {
        this.logger.error('Failed to send SMS: Unknown error');
        throw new Error('Failed to send SMS: Unknown error');
      }
    }
  }

  async sendOtp(userId: number, phoneNumber: string): Promise<void> {
    try {
      const plainOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
      const hashedOtp = await bcrypt.hash(plainOtp, 10);

      const otpEntity = this.otpRepo.create({ phoneNumber, otp: hashedOtp, userId });
      await this.otpRepo.save(otpEntity);

      await this.client.messages.create({
        body: `Your OTP code is ${plainOtp}`,
        from: this.fromPhoneNumber,
        to: phoneNumber,
      });
    } catch (error) {
      this.logger.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }

  async verifyOtp(userId: number, otp: string): Promise<boolean> {
    const otpRecord = await this.otpRepo.findOne({ where: { userId } });

    if (!otpRecord) {
      throw new NotFoundException('Invalid OTP');
    }

    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);

    if (!isOtpValid) {
      throw new NotFoundException('Invalid OTP');
    }

    await this.usersService.updatePhoneNumber(userId, otpRecord.phoneNumber);
    await this.otpRepo.remove(otpRecord);
    return true;
  }
}
