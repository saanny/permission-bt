import { registerAs } from '@nestjs/config';

export const authConfiguration = registerAs('Auth', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN_SECONDS: process.env.JWT_EXPIRES_IN_SECONDS,
}));
