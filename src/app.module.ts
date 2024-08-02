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
      host: process.env.DB_HOST || 'db',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || '^1Wr04yB!NF8',
      database: process.env.DB_NAME || 'dialDB',
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
