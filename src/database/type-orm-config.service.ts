import { Injectable } from '@nestjs/common/decorators';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { GlobalConfigService } from 'src/config/global/global-config.service';
import { PostgresConfigService } from 'src/config/postgres/postgres-config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly postgresConfigService: PostgresConfigService,
    private readonly globalConfigService: GlobalConfigService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.postgresConfigService.DB_HOST,
      port: this.postgresConfigService.DB_PORT,
      username: this.postgresConfigService.DB_USERNAME,
      password: this.postgresConfigService.DB_PASSWORD,
      database: this.postgresConfigService.DB_NAME,
      dropSchema: false,
      namingStrategy: new SnakeNamingStrategy(),
      keepConnectionAlive: true,
      logger:
        this.globalConfigService.NODE_ENV === 'development'
          ? 'debug'
          : 'simple-console',
      logging: false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      poolSize: 10,
      cli: {
        entitiesDir: 'src',
        subscribersDir: 'subscriber',
      },
      ssl: false,
    } as TypeOrmModuleOptions;
  }
}
