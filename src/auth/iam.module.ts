import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { SESSION_REPOSITORY, USER_REPOSITORY } from './auth.const';
import { AuthService } from './auth.service';

import { ConfigService } from '@nestjs/config';
import { AuthController } from 'src/auth/auth.controller';
import { AuthConfigModule } from '../config/auth/auth-config.module';
import { AuthConfigService } from '../config/auth/auth-config.service';
import { RedisConfigService } from '../config/redis/redis-config.service';
import { AuthCacheService } from './auth.cache.service';
import { SessionEntity } from './entity/session.entity';
import { UserEntity } from './entity/user.entity';
import { SessionRepository } from './session.repository';
import { SessionService } from './session.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([UserEntity, SessionEntity]),
    JwtModule.registerAsync({
      inject: [AuthConfigService],
      imports: [AuthConfigModule],
      useFactory(authConfigService: AuthConfigService) {
        return {
          secret: authConfigService.JWT_SECRET,
          signOptions: {
            expiresIn: Number(authConfigService.JWT_EXPIRES_IN_SECONDS),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: SESSION_REPOSITORY,
      useValue: SessionEntity,
    },
    {
      provide: USER_REPOSITORY,
      useValue: UserEntity,
    },
    AuthService,
    AuthCacheService,
    SessionService,
    AuthConfigService,
    RedisConfigService,
    SessionRepository,
    ConfigService,
    UserRepository,
  ],
  exports: [],
})
export class IamModule {}
