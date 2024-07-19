import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('send-sms')
  async sendSms(
    @Body('to') to: string,
    @Body('body') body: string,
  ): Promise<{ sid: string }> {
    const sid = await this.twilioService.sendSms(to, body);
    return { sid };
  }

  @Post('make-call')
  async makeCall(
    @Body('to') to: string,
    @Body('from') from: string,
    @Body('url') url: string,
  ): Promise<{ sid: string }> {
    const sid = await this.twilioService.makeCall(to, from, url);
    return { sid };
  }

  @Post('create-call')
  async createCall(
    @Body('to') to: string,
    @Body('url') url: string,
  ): Promise<{ sid: string }> {
    const sid = await this.twilioService.createCall(to, url);
    console.log(to ,url, sid);
    return { sid };
  }

}