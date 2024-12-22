import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

export enum TweetCategory {
  GENERAL = 'GENERAL',
  NEWS = 'NEWS',
  TECH = 'TECH',
}
registerEnumType(TweetCategory, {
  name: 'TweetCategory',
  description: 'The category of the tweet',
});
@ObjectType({ description: 'Tweet object type.' })
export class Tweet {
  @Field(() => ID, {
    description: 'The tweet ID',
  })
  id: string;

  @Field(() => Date, {
    description: 'The timestamp when the tweet was created',
  })
  createdAt: Date;

  @Field(() => ID, {
    description: 'The ID of the author who created the tweet',
  })
  authorId: string;

  @Field(() => String, {
    description: 'The content of the tweet',
  })
  content: string;

  @Field(() => [String], {
    description: 'The hashtags associated with the tweet',
    nullable: true,
  })
  hashtags?: string[];

  @Field(() => ID, {
    description: 'The ID of the parent tweet if this is a reply',
    nullable: true,
  })
  parentTweetId?: string;

  @Field(() => TweetCategory, {
    description: 'The category of the tweet',
    nullable: true,
  })
  category?: TweetCategory;

  @Field(() => String, {
    description: 'The location associated with the tweet',
    nullable: true,
  })
  location?: string;
}

@Entity({ name: 'tweets' })
export class TweetEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: false, name: 'author_id' })
  authorId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'simple-array', nullable: true })
  hashtags: string[];

  @Column({ type: 'uuid', nullable: true, name: 'parent_tweet_id' })
  parentTweetId: string;

  @Column({
    type: 'enum',
    enum: TweetCategory,
    nullable: true,
    default: TweetCategory.GENERAL,
  })
  category: TweetCategory;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @ManyToOne(() => TweetEntity, (tweet) => tweet.id)
  @JoinColumn({ name: 'parent_tweet_id' })
  parentTweet: TweetEntity;
}
