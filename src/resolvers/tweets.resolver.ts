import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tweet } from 'src/entities/tweet.entity';
import { CreateTweetInput } from 'src/resolvers/dto/create-tweet.input';
import { UpdateTweetPermissionsInput } from 'src/resolvers/dto/update-tweet-permissions.input';

@Resolver()
export class TweetsResolver {
  @Query(() => [Tweet], {
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

  @Mutation(() => Tweet, {
    name: 'createTweet',
    description: 'Create a Tweet',
  })
  async createTweet(@Args('CreateTweet') createTweet: CreateTweetInput) {}

  @Mutation(() => Boolean, {
    name: 'updateTweetPermissions',
    description: 'Updates Tweet permissions based on the input',
  })
  async updateTweetPermissions(
    @Args('UpdateTweetPermissions') createTweet: UpdateTweetPermissionsInput,
  ) {}
}
