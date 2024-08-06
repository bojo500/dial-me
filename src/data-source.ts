import { DataSource } from 'typeorm';
import { User } from './users/entities';
import { Otp } from './twilio/entities';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 8886,
    username: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || '^1Wr04yB!NF8',
    database: process.env.DATABASE_NAME || 'dialDB',
    entities: [User, Otp],
    synchronize: true,
    logging: true,
});

AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
