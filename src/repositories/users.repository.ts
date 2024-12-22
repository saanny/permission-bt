import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly entityRepository: Repository<UserEntity>,
  ) {}
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.entityRepository.findOne({ where: { email } });
  }
  async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.entityRepository.create(user);
    return this.entityRepository.save(newUser);
  }
  async findById(id: string): Promise<UserEntity | null> {
    return this.entityRepository.findOne({ where: { id } });
  }
}
