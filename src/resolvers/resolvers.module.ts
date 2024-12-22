import { Module } from '@nestjs/common';
import { GroupsResolver } from 'src/resolvers/groups.resolver';
import { TweetsResolver } from 'src/resolvers/tweets.resolver';
import { UsersResolver } from 'src/resolvers/users.resolver';
import { ServicesModule } from 'src/services/service.module';

@Module({
  imports: [ServicesModule],
  controllers: [],
  providers: [GroupsResolver, TweetsResolver, UsersResolver],
})
export class ResolversModule {}
