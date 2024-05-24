import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GlobalConfigService {
  constructor(private configService: ConfigService) {}

  get NODE_ENV(): string {
    return this.configService.get<string>('Global.NODE_ENV');
  }

  get PINO_PRETTY(): boolean {
    return this.configService.get<string>('Global.PINO_PRETTY') === 'true';
  }

  get SYNC_DB(): boolean {
    return this.configService.get<string>('Global.SYNC_DB') === 'true';
  }

  get RUN_MIGRATION(): boolean {
    return this.configService.get<string>('Global.RUN_MIGRATION') === 'true';
  }
}
