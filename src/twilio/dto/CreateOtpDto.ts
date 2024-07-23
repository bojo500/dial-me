import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpDto {
  @ApiProperty({ example: '+1234567890', description: 'Phone number to send OTP' })
  phoneNumber: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '123456', description: 'OTP received by the user' })
  otp: string;
}