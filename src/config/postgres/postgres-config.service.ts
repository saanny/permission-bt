import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get DB_HOST(): string {
    return this.configService.get<string>('Postgres.DB_HOST');
  }

  get DB_PORT(): number {
    return this.configService.get<number>('Postgres.DB_PORT');
  }

  get DB_USERNAME(): string {
    return this.configService.get<string>('Postgres.DB_USERNAME');
  }

  get DB_PASSWORD(): string {
    return this.configService.get<string>('Postgres.DB_PASSWORD');
  }

  get DB_NAME(): string {
    return this.configService.get<string>('Postgres.DB_NAME');
  }

  get DB_TIMEZONE(): string {
    return this.configService.get<string>('Postgres.DB_TIMEZONE');
  }
}
