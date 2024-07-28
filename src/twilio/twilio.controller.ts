import { Controller, Post, Body, Param, Res } from "@nestjs/common";
import { TwilioService } from './twilio.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateOtpDto, VerifyOtpDto } from "./dto";
import { Response } from 'express';


@Controller('twilio')
@ApiTags('Twilio 📞 ')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('send-sms')
  @ApiOperation({ summary: 'Send an SMS message' })
  @ApiBody({ schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: '+1234567890', description: 'Recipient phone number' },
        body: { type: 'string', example: 'Hello, this is a test message', description: 'Message body' },
      }
    }})
  @ApiResponse({ status: 201, description: 'SMS sent successfully', schema: {
      type: 'object',
      properties: {
        sid: { type: 'string', example: 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' }
      }
    }})
  async sendSms(@Body('to') to: string, @Body('body') body: string,): Promise<{ sid: string }> {
    const sid = await this.twilioService.sendSms(to, body);
    return { sid };
  }

  @Post('make-call')
  @ApiOperation({ summary: 'Make a phone call' })
  @ApiBody({ schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: '+1234567890', description: 'Recipient phone number' },
        from: { type: 'string', example: '+0987654321', description: 'Caller phone number' },
        url: { type: 'string', example: 'http://demo.twilio.com/docs/voice.xml', description: 'URL for Twilio Voice XML' },
      }
    }})
  @ApiResponse({ status: 201, description: 'Call initiated successfully', schema: {
      type: 'object',
      properties: {
        sid: { type: 'string', example: 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' }
      }
    }})
  async makeCall(
    @Body('to') to: string,
    @Body('from') from: string,
    @Body('url') url: string,
  ): Promise<{ sid: string }> {
    const webhookUrl = 'http://localhost:9000/twilio/voice'; // Replace with your actual webhook URL
    const sid = await this.twilioService.makeCall(to, from, webhookUrl);
    return { sid };
  }


  @Post('hangup')
  @ApiOperation({ summary: 'Handle hangup' })
  @ApiResponse({ status: 200, description: 'Hangup response created' })
  handleHangup(): string {
    return this.twilioService.createHangupResponse();
  }

  @Post('voice')
  handleVoiceCall(@Body() body: any, @Res() res: Response) {
    const twiml = `
      <Response>
        <Dial>
          <Client>your-app-client-id</Client>
        </Dial>
      </Response>
    `;
    res.set('Content-Type', 'text/xml');
    res.send(twiml);
  }

  @Post('send-otp/:userId')
  @ApiOperation({ summary: 'Send OTP to a phone number' })
  @ApiBody({ type: CreateOtpDto })
  @ApiResponse({ status: 201, description: 'OTP sent successfully' })
  async sendOtp(
    @Param('userId') userId: number,
    @Body('phoneNumber') phoneNumber: string,
  ): Promise<{ message: string }> {
    await this.twilioService.sendOtp(userId, phoneNumber);
    return { message: 'OTP sent successfully' };
  }


  @Post('verify-otp/:userId')
  @ApiOperation({ summary: 'Verify the OTP for a user' })
  @ApiParam({ name: 'userId', type: 'number', description: 'ID of the user' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP' })
  async verifyOtp(
    @Param('userId') userId: number,
    @Body('otp') otp: string,
  ): Promise<{ message: string, verified: boolean }> {
    const verified = await this.twilioService.verifyOtp(userId, otp);
    if (verified) {
      return { message: 'OTP verified successfully', verified: true };
    } else {
      return { message: 'Invalid OTP', verified: false };
    }
  }
}