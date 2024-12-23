import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entity';
import { TweetEntity } from 'src/entities/tweet.entity';
import { UserEntity } from 'src/entities/user.entity';
import { GroupsRepository } from 'src/repositories/groups.repository';
import { TweetsRepository } from 'src/repositories/tweets.repository';
import { UsersRepository } from 'src/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, GroupEntity, TweetEntity])],
  providers: [GroupsRepository, TweetsRepository, UsersRepository],
  exports: [GroupsRepository, TweetsRepository, UsersRepository],
})
export class RepositoriesModule {}
