export interface CreateGroupInput {}
export interface CreateGroupResult {}

export interface IGroupsService {
  createGroup(input: CreateGroupInput): Promise<CreateGroupResult>;
}
export const GroupsService = Symbol('GroupsService');
