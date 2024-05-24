import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  get SHARED_REDIS_MASTER_HOST(): string {
    return this.configService.get<string>('Redis.SHARED_REDIS_MASTER_HOST');
  }

  get SHARED_REDIS_MASTER_PORT(): number {
    return this.configService.get<number>('Redis.SHARED_REDIS_MASTER_PORT');
  }

  get SHARED_REDIS_SLAVE1_HOST(): string {
    return this.configService.get<string>('Redis.SHARED_REDIS_SLAVE1_HOST');
  }

  get SHARED_REDIS_SLAVE1_PORT(): string {
    return this.configService.get<string>('Redis.SHARED_REDIS_SLAVE1_PORT');
  }

  get SHARED_REDIS_KEYPREFIX(): string {
    return this.configService.get<string>('Redis.SHARED_REDIS_KEYPREFIX');
  }

  get SHARED_REDIS_PASSWORD(): string {
    return this.configService.get<string>('Redis.SHARED_REDIS_PASSWORD');
  }
}
