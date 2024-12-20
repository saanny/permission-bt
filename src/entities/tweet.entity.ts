import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

export enum TweetCategory {
  GENERAL = 'GENERAL',
  NEWS = 'NEWS',
  TECH = 'TECH',
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
