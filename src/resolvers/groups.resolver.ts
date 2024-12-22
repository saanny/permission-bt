import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Group } from 'src/entities/group.entitiy';
import { CreateGroupInput } from 'src/resolvers/dto/create-group.input';

@Resolver()
export class GroupsResolver {
  @Mutation(() => Group, {
    name: 'createGroup',
    description: 'Create a group that can be used for permissions',
  })
  async createGroup(@Args('CreateGroup') CreateGroup: CreateGroupInput) {}
}
