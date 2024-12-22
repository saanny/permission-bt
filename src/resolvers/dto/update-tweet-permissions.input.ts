import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ description: 'Update tweet permissions input object type.' })
export class UpdateTweetPermissionsInput {
  @Field(() => Boolean, {
    description: `If provided:
- if it is true it means the tweet inherits parent tweets permission. If the tweet has no parent, it means everyone can view this tweet.
- if it is false, it means the "viewPermissions" settings will be considered for this Tweet.`,
  })
  inheritViewPermissions: boolean;

  @Field(() => Boolean, {
    description: `If provided:
- if it is true it means the tweet inherits parent tweets permission. If the tweet has no parent, it means everyone can edit this tweet.
- if it is false, it means the "editPermissions" settings will be considered for this Tweet.`,
  })
  inheritEditPermissions: boolean;

  @Field(() => [ID], {
    description: `A list of User IDs and Group IDs that can view this Tweet. It only applies if "inheritViewPermissions" is false.`,
  })
  viewPermissions: string[];

  @Field(() => [ID], {
    description: `A list of User IDs and Group IDs that can edit this Tweet. It only applies if "inheritEditPermissions" is false.`,
  })
  editPermissions: string[];
}
