import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './auth.const';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { UserEntity } from './entity/user.entity';
export class RegisterUserDto {
  email: string;
  password: string;
}
@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof UserEntity,
  ) {}
  async saveUser(data: Optional<UserEntity, NullishPropertiesOf<UserEntity>>) {
    return this.userRepository.create(data);
  }
  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
  async isUserExist(id: string) {
    const count = await this.userRepository.count({
      where: {
        id,
      },
    });
    return count === 1;
  }
  async findUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }
  async registerUser(data: RegisterUserDto) {
    const exist = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
      attributes: ['id'],
    });
    if (exist) {
      throw new Error('EMAIL_ADDRESS_ALREADY_IN_USE');
    }
    return this.userRepository.create({
      ...data,
      firstName: 'test',
      lastName: 'test',
    });
  }
}
