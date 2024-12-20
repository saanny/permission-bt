import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { RedisConfigService } from 'src/config/redis/redis-config.service';
import { redisConfiguration } from 'src/config/redis/redis-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfiguration],
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, RedisConfigService],
  exports: [ConfigService, RedisConfigService],
})
export class RedisConfigModule {}
