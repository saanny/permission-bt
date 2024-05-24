import { registerAs } from '@nestjs/config';
export const postgresConfiguration = registerAs('Postgres', () => ({
  DB_MASTER_HOST: process.env.DB_MASTER_HOST,
  DB_MASTER_PORT: process.env.DB_MASTER_PORT,
  DB_MASTER_USERNAME: process.env.DB_MASTER_USERNAME,
  DB_MASTER_PASSWORD: process.env.DB_MASTER_PASSWORD,

  DB_SLAVE_HOST: process.env.DB_SLAVE_HOST,
  DB_SLAVE_PORT: process.env.DB_SLAVE_PORT,
  DB_SLAVE_USERNAME: process.env.DB_SLAVE_USERNAME,
  DB_SLAVE_PASSWORD: process.env.DB_SLAVE_PASSWORD,

  DB_NAME: process.env.DB_NAME,
  DB_TIMEZONE: process.env.DB_TIMEZONE,
}));
