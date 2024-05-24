import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { authConfiguration } from './auth-configuration';
import { AuthConfigService } from './auth-config.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfiguration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN_SECONDS: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        SESSION_EXPIRATION: Joi.string().required(),
        SKIP_SESSION_MANAGEMENT: Joi.string().required(),
        KEEP_ME_SIGN_IN_EXPIRATION: Joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}
