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
      host: 'localhost',
      port: 8886,
      username: 'admin',
      password: '^1Wr04yB!NF8',
      database: 'dialDB',
      entities: [User,Otp],
      synchronize: true,
    }),
    ...features,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
