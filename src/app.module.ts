import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GlobalConfigModule } from 'src/config/global/global-config.module';
import { GlobalConfigService } from 'src/config/global/global-config.service';
import { MainDatabaseModule } from 'src/database/main-database.module';
import { ResolversModule } from 'src/resolvers/resolvers.module';
import { ServicesModule } from 'src/services/service.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MainDatabaseModule,
    ServicesModule,
    ResolversModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
