import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsRepository {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly entityRepository: Repository<GroupEntity>,
  ) {}
}
