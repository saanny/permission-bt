import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisConfigService } from 'src/config/redis/redis-config.service';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: (configService: RedisConfigService) => {
    return new Redis({
      host: configService.REDIS_HOST,
      port: configService.REDIS_PORT,
      password: 'mypassword',
    });
  },
  inject: [RedisConfigService],
};
