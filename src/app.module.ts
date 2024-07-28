import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {features } from "./index";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities";
import { Otp } from "./twilio/entities";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 8886,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User,Otp],
      synchronize: true,
    }),ConfigModule.forRoot({ isGlobal: true}),
    ...features,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
