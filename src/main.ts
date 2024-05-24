import { NestFactory } from '@nestjs/core';
import { exec } from 'child_process';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { GlobalConfigService } from './config/global/global-config.service';
import { setupSwagger } from './swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  const globalConfigService = app.get<GlobalConfigService>(GlobalConfigService);
  app.enableVersioning();
  setupSwagger(app);

  const env = Object.assign(
    { NODE_OPTIONS: '--max-old-space-size=256' },
    process.env,
  );

  globalConfigService.RUN_MIGRATION
    ? exec('yarn migrate', { env }, function (error, stdout) {
        error?.message && app.get(Logger).error(error?.message);
        stdout && app.get(Logger).log(stdout);
      })
    : undefined;

  await app.listen(3000);
}

bootstrap();
