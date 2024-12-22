import { Injectable } from '@nestjs/common';
import { CreateGroupInput, CreateGroupResult, IGroupsService } from 'src/services/interfaces';

@Injectable()
export class GroupsServiceImpl implements IGroupsService {
    createGroup(input: CreateGroupInput): Promise<CreateGroupResult> {
        throw new Error('Method not implemented.');
    }
}
