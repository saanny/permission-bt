export interface CreateGroupInput {
  name: string;
  userIds: string[];
  groupIds: string[];
}
export interface CreateGroupResult {
  id: string;
  name: string;
  userIds: string[];
  groupIds: string[];
}

export interface IGroupsService {
  createGroup(input: CreateGroupInput): Promise<CreateGroupResult>;
}
export const GroupsService = Symbol('GroupsService');
