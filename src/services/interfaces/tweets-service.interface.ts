export interface CreateTweetInput {}
export interface CreateTweetResult {}
export interface UpdateTweetPermissionsInput {}

export interface PaginateTweetsInput {}
export interface PaginateTweetsResult {}
export interface CanEditTweetInput {}
export interface CanEditTweetResult {}
export interface ITweetsService {
  createTweet(input: CreateTweetInput): Promise<CreateTweetResult>;
  updateTweetPermissions(input: UpdateTweetPermissionsInput): Promise<boolean>;
  paginateTweets(input: PaginateTweetsInput): Promise<PaginateTweetsResult>;
  canEditTweet(input: CanEditTweetInput): Promise<CanEditTweetResult>;
}
export const TweetsService = Symbol('TweetsService');
