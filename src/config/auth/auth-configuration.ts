import { registerAs } from '@nestjs/config';

export const authConfiguration = registerAs('Auth', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN_SECONDS: process.env.JWT_EXPIRES_IN_SECONDS,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  SESSION_EXPIRATION: process.env.SESSION_EXPIRATION,
  SKIP_SESSION_MANAGEMENT: process.env.SKIP_SESSION_MANAGEMENT,
  KEEP_ME_SIGN_IN_EXPIRATION: process.env.KEEP_ME_SIGN_IN_EXPIRATION,
}));
