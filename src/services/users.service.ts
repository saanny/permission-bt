import { Injectable } from '@nestjs/common';
import {
    IUsersService,
    LoginInput,
    LoginResult,
    MeInput,
    MeResult,
    RegisterInput,
    RegisterResult,
} from 'src/services/interfaces';

@Injectable()
export class UsersServiceImpl implements IUsersService {
  register(input: RegisterInput): Promise<RegisterResult> {
    throw new Error('Method not implemented.');
  }
  login(input: LoginInput): Promise<LoginResult> {
    throw new Error('Method not implemented.');
  }
  me(input: MeInput): Promise<MeResult> {
    throw new Error('Method not implemented.');
  }
}
