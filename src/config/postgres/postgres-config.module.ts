import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PostgresConfigService } from 'src/config/postgres/postgres-config.service';
import { postgresConfiguration } from 'src/config/postgres/postgres-configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfiguration],
      validationSchema: Joi.object({
        DB_MASTER_HOST: Joi.string().required(),
        DB_MASTER_PORT: Joi.number().required(),
        DB_MASTER_USERNAME: Joi.string().required(),
        DB_MASTER_PASSWORD: Joi.string().required(),

        DB_SLAVE_HOST: Joi.string().required(),
        DB_SLAVE_PORT: Joi.number().required(),
        DB_SLAVE_USERNAME: Joi.string().required(),
        DB_SLAVE_PASSWORD: Joi.string().required(),

        DB_NAME: Joi.string().required(),
        DB_TIMEZONE: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, PostgresConfigService],
  exports: [ConfigService, PostgresConfigService],
})
export class PostgresConfigModule {}
