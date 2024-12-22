import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  email: string;

  @Field()
  username: string;
}

@ObjectType()
export class AuthResponseType {
  @Field(() => UserType)
  user: UserType;

  @Field()
  token: string;
}
