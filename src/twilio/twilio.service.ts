import { Injectable, Logger } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private readonly logger = new Logger(TwilioService.name);
  private client: Twilio.Twilio;
  private fromPhoneNumber: string;

  constructor() {
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
}

