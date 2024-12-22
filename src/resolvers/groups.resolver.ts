import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Group } from 'src/entities/group.entitiy';
import { CreateGroupInput } from 'src/resolvers/dto/create-group.input';
import { GroupsService, IGroupsService } from 'src/services/interfaces';

@Resolver()
export class GroupsResolver {
  constructor(
    @Inject(GroupsService)
    private readonly groupService: IGroupsService,
  ) {}
  @Mutation(() => Group, {
    name: 'createGroup',
    description: 'Create a group that can be used for permissions',
  })
  async createGroup(@Args('CreateGroup') createGroup: CreateGroupInput) {
    return this.groupService.createGroup(createGroup);
  }
}
