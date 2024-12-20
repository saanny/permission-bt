import { registerAs } from '@nestjs/config';
export const redisConfiguration = registerAs('Redis', () => ({
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
}));
