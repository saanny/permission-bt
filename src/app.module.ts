import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import { IamModule } from 'src/auth/iam.module';
import { GlobalConfigModule } from 'src/config/global/global-config.module';
import { GlobalConfigService } from 'src/config/global/global-config.service';
import { RedisConfigModule } from 'src/config/redis/redis-config.module';
import { RedisConfigService } from 'src/config/redis/redis-config.service';
import { PostgresDbModule } from 'src/database/postgresdb.module';

@Module({
  imports: [
    PostgresDbModule,
    LoggerModule.forRootAsync({
      inject: [GlobalConfigService],
      imports: [GlobalConfigModule],
      useFactory: (globalConfigService: GlobalConfigService) => {
        return {
          pinoHttp: {
            formatters: {
              bindings: (bindings) => {
                return {
                  host: bindings.hostname,
                };
              },

              level: (label) => {
                return { level: label.toUpperCase() };
              },
            },
            timestamp: pino.stdTimeFunctions.isoTime,
            transport: globalConfigService.PINO_PRETTY
              ? {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                }
              : undefined,
            autoLogging: false,
          },
        };
      },
    }),
    CacheModule.registerAsync<CacheModuleAsyncOptions>({
      isGlobal: true,
      inject: [RedisConfigService],
      imports: [RedisConfigModule],
      useFactory: (redisConfigService: RedisConfigService) => {
        const preferredSlaves = [
          {
            ip: redisConfigService.SHARED_REDIS_SLAVE1_HOST,
            port: redisConfigService.SHARED_REDIS_SLAVE1_PORT,
            prio: 1,
          },
        ];
        return {
          store: ioRedisStore,
          host: redisConfigService.SHARED_REDIS_MASTER_HOST,
          port: redisConfigService.SHARED_REDIS_MASTER_PORT,
          password: redisConfigService.SHARED_REDIS_PASSWORD || null,
          preferredSlaves: preferredSlaves,
          keyPrefix: redisConfigService.SHARED_REDIS_KEYPREFIX,
        };
      },
    }),
    IamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
