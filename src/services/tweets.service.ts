import { Injectable } from '@nestjs/common';
import { CanEditTweetInput, CanEditTweetResult, CreateTweetInput, CreateTweetResult, ITweetsService, PaginateTweetsInput, PaginateTweetsResult, UpdateTweetPermissionsInput } from 'src/services/interfaces';

@Injectable()
export class TweetsServiceImpl implements ITweetsService {
    createTweet(input: CreateTweetInput): Promise<CreateTweetResult> {
        throw new Error('Method not implemented.');
    }
    updateTweetPermissions(input: UpdateTweetPermissionsInput): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    paginateTweets(input: PaginateTweetsInput): Promise<PaginateTweetsResult> {
        throw new Error('Method not implemented.');
    }
    canEditTweet(input: CanEditTweetInput): Promise<CanEditTweetResult> {
        throw new Error('Method not implemented.');
    }
}
