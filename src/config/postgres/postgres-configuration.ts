import { registerAs } from '@nestjs/config';
export const postgresConfiguration = registerAs('Postgres', () => ({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,

  DB_NAME: process.env.DB_NAME,
  DB_TIMEZONE: process.env.DB_TIMEZONE,
}));
