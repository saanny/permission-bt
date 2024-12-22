import { Module } from '@nestjs/common';
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
  imports: [RepositoriesModule],
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
