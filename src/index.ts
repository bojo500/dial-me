import {AuthModule} from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CoreEntity } from "./core";

export const features = [
  AuthModule,
  UsersModule,
]

export const Entities = [
  CoreEntity
]