import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { GlobalConfigService } from './global-config.service';
import { globalConfiguration } from './global-configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [globalConfiguration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid(
          'local',
          'development',
          'staging',
          'production',
          'test',
        ),
        PINO_PRETTY: Joi.string().valid('true', 'false').required(),
        SYNC_DB: Joi.string().valid('true', 'false').required(),
        RUN_MIGRATION: Joi.string().valid('true', 'false').required(),
      }),
    }),
  ],
  providers: [ConfigService, GlobalConfigService],
  exports: [ConfigService, GlobalConfigService],
})
export class GlobalConfigModule {}
