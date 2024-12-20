import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  get REDIS_HOST(): string {
    return this.configService.get<string>('Redis.REDIS_HOST');
  }

  get REDIS_PORT(): number {
    return this.configService.get<number>('Redis.REDIS_PORT');
  }

  get REDIS_PASSWORD(): string {
    return this.configService.get<string>('Redis.REDIS_PASSWORD');
  }
}
