import { registerAs } from '@nestjs/config';

export const globalConfiguration = registerAs('Global', () => ({
  NODE_ENV: process.env.NODE_ENV,
  PINO_PRETTY: process.env.PINO_PRETTY,
  SYNC_DB: process.env.SYNC_DB,
  RUN_MIGRATION: process.env.RUN_MIGRATION,
}));
