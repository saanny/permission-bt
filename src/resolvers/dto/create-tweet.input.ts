import { Field, ID, InputType } from '@nestjs/graphql';
import { TweetCategory } from 'src/entities/tweet.entity';

@InputType({ description: 'Create tweet input object type.' })
export class CreateTweetInput {
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
    description:
      'The ID of the parent tweet, if the tweet has no parent, it can be null',
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
