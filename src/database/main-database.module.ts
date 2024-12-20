import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from 'src/config/postgres/postgres-config.module';
import { GlobalConfigModule } from '../config/global/global-config.module';
import { TypeOrmConfigService } from './type-orm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule, GlobalConfigModule],
      useClass: TypeOrmConfigService,
      extraProviders: [],
    }),
  ],
})
export class MainDatabaseModule {}
