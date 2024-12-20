import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entitiy';
import { TweetEntity } from 'src/entities/tweet.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, GroupEntity, TweetEntity])],
})
export class RepositoriesModule {}
