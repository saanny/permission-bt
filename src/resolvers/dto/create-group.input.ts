import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create group input object type.' })
export class CreateGroupInput {
  @Field(() => [ID], { description: 'The user IDs that are part this Group' })
  userIds: string[];

  @Field(() => [ID], {
    description: 'The group IDs that are part of this Group',
  })
  groupIds: string[];
}
