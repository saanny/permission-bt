import { Injectable } from '@nestjs/common';
import { TweetsRepository } from 'src/repositories/tweets.repository';
import {
    CanEditTweetInput,
    CreateTweetInput,
    CreateTweetResult,
    ITweetsService,
    PaginateTweetsInput,
    PaginateTweetsResult,
    UpdateTweetPermissionsInput,
} from 'src/services/interfaces';

@Injectable()
export class TweetsServiceImpl implements ITweetsService {
  constructor(private readonly tweetsRepository: TweetsRepository) {}
  async createTweet(input: CreateTweetInput): Promise<CreateTweetResult> {
    const result = await this.tweetsRepository.create(input);
    return result;
  }
  updateTweetPermissions(input: UpdateTweetPermissionsInput): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  paginateTweets(input: PaginateTweetsInput): Promise<PaginateTweetsResult> {
    throw new Error('Method not implemented.');
  }
  canEditTweet(input: CanEditTweetInput): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
