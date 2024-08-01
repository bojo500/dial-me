import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { features } from "./index";
import { User } from "./users/entities";
import { Otp } from "./twilio/entities";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User,Otp],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ...features,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
