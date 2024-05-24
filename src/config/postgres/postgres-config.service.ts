import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get DB_MASTER_HOST(): string {
    return this.configService.get<string>('Postgres.DB_MASTER_HOST');
  }

  get DB_MASTER_PORT(): number {
    return this.configService.get<number>('Postgres.DB_MASTER_PORT');
  }

  get DB_MASTER_USERNAME(): string {
    return this.configService.get<string>('Postgres.DB_MASTER_USERNAME');
  }

  get DB_MASTER_PASSWORD(): string {
    return this.configService.get<string>('Postgres.DB_MASTER_PASSWORD');
  }

  get DB_SLAVE_HOST(): string {
    return this.configService.get<string>('Postgres.DB_SLAVE_HOST');
  }

  get DB_SLAVE_PORT(): number {
    return this.configService.get<number>('Postgres.DB_SLAVE_PORT');
  }

  get DB_SLAVE_USERNAME(): string {
    return this.configService.get<string>('Postgres.DB_SLAVE_USERNAME');
  }

  get DB_SLAVE_PASSWORD(): string {
    return this.configService.get<string>('Postgres.DB_SLAVE_PASSWORD');
  }

  get DB_NAME(): string {
    return this.configService.get<string>('Postgres.DB_NAME');
  }

  get DB_TIMEZONE(): string {
    return this.configService.get<string>('Postgres.DB_TIMEZONE');
  }
}
