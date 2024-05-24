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
        SHARED_REDIS_MASTER_HOST: Joi.string().required(),
        SHARED_REDIS_MASTER_PORT: Joi.string().required(),
        SHARED_REDIS_SLAVE1_HOST: Joi.string().required(),
        SHARED_REDIS_SLAVE1_PORT: Joi.string().required(),
        SHARED_REDIS_KEYPREFIX: Joi.string().required(),
        SHARED_REDIS_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, RedisConfigService],
  exports: [ConfigService, RedisConfigService],
})
export class RedisConfigModule {}
