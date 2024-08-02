import { DataSource } from 'typeorm';
import { User } from "./users/entities";
import { Otp } from "./twilio/entities";

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 8886,
  username: 'admin',
  password: '^1Wr04yB!NF8',
  database: 'dialDB',
  entities: [User, Otp],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true, // Consider setting this to false in production
});