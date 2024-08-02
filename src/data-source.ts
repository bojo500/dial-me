import { DataSource } from 'typeorm';
import { User } from "./users/entities";
import { Otp } from "./twilio/entities";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'test',
  synchronize: true,
  logging: false,
  entities: [User, Otp],
  migrations: ['src/database/migrations/*.ts'],
});
