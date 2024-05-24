import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PinoLogger } from 'nestjs-pino';
import { PostgresConfigModule } from 'src/config/postgres/postgres-config.module';
import { PostgresConfigService } from 'src/config/postgres/postgres-config.service';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (
        postgresConfigService: PostgresConfigService,
        pinoLogger: PinoLogger,
      ) => {
        return {
          dialect: 'postgres',
          benchmark: true,
          timezone: postgresConfigService.DB_TIMEZONE,
          synchronize: process.env.SYNC_DB === 'true',
          logging: (sql, sqlExecutionTime) => {
            pinoLogger.info({ sql, sqlExecutionTime, context: 'Database' });
          },
          logQueryParameters: true,
          autoLoadModels: true,
          replication: {
            read: [
              {
                host: postgresConfigService.DB_SLAVE_HOST,
                port: postgresConfigService.DB_SLAVE_PORT,
                database: postgresConfigService.DB_NAME,
                username: postgresConfigService.DB_SLAVE_USERNAME,
                password: postgresConfigService.DB_SLAVE_PASSWORD,
              },
            ],
            write: {
              host: postgresConfigService.DB_MASTER_HOST,
              port: postgresConfigService.DB_MASTER_PORT,
              database: postgresConfigService.DB_NAME,
              username: postgresConfigService.DB_MASTER_USERNAME,
              password: postgresConfigService.DB_MASTER_PASSWORD,
            },
          },
        };
      },
      inject: [PostgresConfigService, PinoLogger],
      imports: [PostgresConfigModule],
    }),
  ],
})
export class PostgresDbModule {}
