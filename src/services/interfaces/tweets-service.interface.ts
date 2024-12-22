import { TweetCategory } from 'src/entities/tweet.entity';

export interface CreateTweetInput {
  authorId: string;
  content: string;
  hashtags?: string[];
  parentTweetId?: string;
  category?: TweetCategory;
  location?: string;
}
export interface CreateTweetResult {
  id: string;
  createdAt: Date;
  authorId: string;
  content: string;
  hashtags?: string[];
  parentTweetId?: string;
  category?: TweetCategory;
  location?: string;
}
export interface UpdateTweetPermissionsInput {
  inheritViewPermissions: boolean;
  inheritEditPermissions: boolean;
  viewPermissions: string[];
  editPermissions: string[];
}

export interface PaginateTweetsInput {}
export interface PaginateTweetsResult {}
export interface CanEditTweetInput {
  userId: string;
  tweetId: string;
}

export interface ITweetsService {
  createTweet(input: CreateTweetInput): Promise<CreateTweetResult>;
  updateTweetPermissions(input: UpdateTweetPermissionsInput): Promise<boolean>;
  paginateTweets(input: PaginateTweetsInput): Promise<PaginateTweetsResult>;
  canEditTweet(input: CanEditTweetInput): Promise<boolean>;
}
export const TweetsService = Symbol('TweetsService');
