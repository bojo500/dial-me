import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { features } from "./index";
import { User } from "./users/entities";
import { Otp } from "./twilio/entities";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 8886,
      username: process.env.DATABASE_USER || 'admin',
      password: process.env.DATABASE_PASSWORD || '^1Wr04yB!NF8',
      database: process.env.DATABASE_NAME || 'dialDB',
      entities: [User, Otp],
      synchronize: true,
      logging: true,
    }),
    ...features,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
