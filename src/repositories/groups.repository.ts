import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsRepository {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly entityRepository: Repository<GroupEntity>,
  ) {}

  async create(data: Partial<GroupEntity>): Promise<GroupEntity> {
    const group = this.entityRepository.create(data);
    return await this.entityRepository.save(group);
  }

  async findById(id: string): Promise<GroupEntity | null> {
    return this.entityRepository.findOne({
      where: { id },
      relations: ['users', 'childGroups'],
    });
  }
}
