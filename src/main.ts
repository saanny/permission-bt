import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { exec } from 'child_process';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { GlobalConfigService } from './config/global/global-config.service';

async function runMigrations(app: INestApplication): Promise<void> {
  const logger = app.get(Logger);
  const env = { ...process.env };

  return new Promise((resolve, reject) => {
    exec(
      'yarn migrate',
      { env, maxBuffer: 1024 * 1024 * 10 },
      (error, stdout, stderr) => {
        if (error) {
          logger.error('Migration error:', error.message);
          if (stderr) {
            logger.error('Migration stderr:', stderr);
          }
          return reject(error);
        }
        logger.log('Migration stdout:', stdout);
        resolve();
      },
    );
  });
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const globalConfigService = app.get<GlobalConfigService>(GlobalConfigService);
  if (globalConfigService.RUN_MIGRATION) {
    await runMigrations(app);
  }

  await app.startAllMicroservices();

  await app.init();
}

bootstrap();
