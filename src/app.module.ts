import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';

import { GlobalConfigModule } from 'src/config/global/global-config.module';
import { GlobalConfigService } from 'src/config/global/global-config.service';

@Module({
  imports: [
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
