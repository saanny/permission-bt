import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { RedisCache } from '@tirke/node-cache-manager-ioredis';
import { AuthConfigService } from '../config/auth/auth-config.service';
import { RedisConfigService } from '../config/redis/redis-config.service';
@Injectable()
export class AuthCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    private authConfigService: AuthConfigService,
    private redisConfigService: RedisConfigService,
  ) {}

  async saveAccessToken(
    userId: string,
    accessToken: string,
    sessionId: string,
  ): Promise<void> {
    const key = `USER_SESSION:${userId}:${sessionId}`;
    const pipeline = this.cacheManager.store.client.pipeline();
    pipeline.hset(key, 'token', accessToken);
    pipeline.expire(key, this.authConfigService.JWT_EXPIRES_IN_SECONDS);
    await pipeline.exec();
  }

  async deleteAccessTokens(userId: string, excludeSessions?: string[]) {
    const keys = await this.cacheManager.store.client.keys(
      `${this.redisConfigService.SHARED_REDIS_KEYPREFIX}USER_SESSION:${userId}:*`,
    );
    for await (const key of keys) {
      const keyWithOutPrefix = key.split(
        this.redisConfigService.SHARED_REDIS_KEYPREFIX,
      );
      const sessionId = keyWithOutPrefix[1].split(':')[2];
      if (!excludeSessions.includes(sessionId)) {
        await this.cacheManager.del(keyWithOutPrefix[1]);
      }
    }
  }
}
