import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Int, Query, Resolver } from '@nestjs/graphql';
import { TestTweet } from 'src/entities/tweet.entity';

@Resolver()
export class TweetsResolver {
  @Query(() => [TestTweet], {
    name: 'paginateTweets',
    description:
      'Paginates over tweets for the given user ID This API only retrieves those tweets that are viewable for the given user ID Tweets order should be based on ',
  })
  async paginatedTweets(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('limit', { type: () => Int }, ParseIntPipe) limit: number,
    @Args('page', { type: () => Int }, ParseIntPipe) page: number,
  ) {
    return [];
  }

  @Query(() => Boolean, {
    name: 'canEditTweet',
    description:
      'Returns true if the given user ID can edit the given tweet ID',
  })
  async canEditTweet(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('tweetId', { type: () => ID }) tweetId: string,
  ) {}
}
