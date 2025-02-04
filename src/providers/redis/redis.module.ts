import { Module } from '@nestjs/common';
import { RedisConfigModule } from 'src/config/redis/redis-config.module';
import { RedisProvider } from 'src/providers/redis/redis-providers';
@Module({
  imports: [RedisConfigModule],
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {}
