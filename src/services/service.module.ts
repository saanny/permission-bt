import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigModule } from 'src/config/auth/auth-config.module';
import { AuthConfigService } from 'src/config/auth/auth-config.service';
import { RedisModule } from 'src/database/redis/redis.module';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { GroupsServiceImpl } from 'src/services/groups.service';
import {
    GroupsService,
    TweetsService,
    UsersService,
} from 'src/services/interfaces';
import { TweetsServiceImpl } from 'src/services/tweets.service';
import { UsersServiceImpl } from 'src/services/users.service';

@Module({
  imports: [
    RepositoriesModule,
    RedisModule,

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
  providers: [
    {
      provide: GroupsService,
      useClass: GroupsServiceImpl,
    },
    {
      provide: TweetsService,
      useClass: TweetsServiceImpl,
    },
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
    },
  ],
})
export class ServicesModule {}
