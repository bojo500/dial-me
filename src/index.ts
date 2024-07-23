import {AuthModule} from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CoreEntity } from "./core";
import { TwilioModule } from "./twilio/twilio.module";

export const features = [
  AuthModule,
  UsersModule,
  TwilioModule
]

export const Entities = [
  CoreEntity
]