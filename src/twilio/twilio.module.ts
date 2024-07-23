import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioController } from "./twilio.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Otp } from "./entities";
import { User } from "../users/entities";
import { UsersService } from "../users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([Otp, User])],
  providers: [TwilioService, UsersService],
  controllers: [TwilioController],
  exports: [TwilioService],
})
export class TwilioModule {}
