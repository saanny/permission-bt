import { Injectable } from '@nestjs/common';
import { GroupEntity } from 'src/entities/group.entitiy';
import { UserEntity } from 'src/entities/user.entity';
import { GroupsRepository } from 'src/repositories/groups.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import {
    CreateGroupInput,
    CreateGroupResult,
    IGroupsService,
} from 'src/services/interfaces';

@Injectable()
export class GroupsServiceImpl implements IGroupsService {
  constructor(
    private readonly groupRepository: GroupsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}
  async createGroup(input: CreateGroupInput): Promise<CreateGroupResult> {
    const users: UserEntity[] = [];
    if (input.userIds && input.userIds.length > 0) {
      for (const userId of input.userIds) {
        const user = await this.usersRepository.findById(userId);
        if (user) {
          users.push(user);
        }
      }
    }
    const childGroups: GroupEntity[] = [];
    if (input.groupIds && input.groupIds.length > 0) {
      for (const groupId of input.groupIds) {
        const group = await this.groupRepository.findById(groupId);
        if (group) {
          childGroups.push(group);
        }
      }
    }
    const group = await this.groupRepository.create({
      name: input.name,
      users: users,
      childGroups,
    });

    return {
      name: group.name,
      userIds: group.users?.map((user) => user.id) || [],
      groupIds: group.childGroups?.map((parent) => parent.id) || [],
    };
  }
}
