import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthConfigService } from './auth-config.service';
import { authConfiguration } from './auth-configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfiguration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN_SECONDS: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}
