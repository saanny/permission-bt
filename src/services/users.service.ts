import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Redis } from 'ioredis';
import { SignOptions } from 'jsonwebtoken';
import { UsersRepository } from 'src/repositories/users.repository';
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
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwt: JwtService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}
  async register(input: RegisterInput): Promise<RegisterResult> {
    const { email, password, username } = input;
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new UnauthorizedException('User Already Exist');
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.createUser({
      email,
      password: hash,
      username,
    });
    const accessToken = await this.generateAccessToken(user);

    await this.saveAccessToken(userExist, accessToken);
    return {
      user: {
        email,
        username,
      },
      token: accessToken,
    };
  }
  async login(input: LoginInput): Promise<LoginResult> {
    const { email, password } = input;
    const userExist = await this.usersRepository.findByEmail(email);

    if (!userExist) {
      throw new UnauthorizedException('User Not found');
    }
    const valid = await this.validateCredentials(userExist, password);

    if (!valid) {
      throw new BadRequestException('Password Not Valid');
    }
    const accessToken = await this.generateAccessToken(userExist);

    await this.saveAccessToken(userExist, accessToken);
    return {
      user: {
        email,
        username: userExist.username,
      },
      token: accessToken,
    };
  }
  async me(input: MeInput): Promise<MeResult> {
    const { userId } = input;
    const userExist = await this.usersRepository.findById(userId);

    if (!userExist) {
      throw new UnauthorizedException('User Not found');
    }
    return {
      user: {
        email: userExist.email,
        username: userExist.username,
      },
    };
  }

  private async generateAccessToken(user: any): Promise<string> {
    const opts: SignOptions = {
      subject: String(user.id),
    };
    return this.jwt.signAsync({}, opts);
  }
  async decodeToken(token: string) {
    try {
      const decoded = await this.jwt.verifyAsync(token);
      return decoded;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token_Expired');
      } else {
        throw new UnauthorizedException('Token_Malformed');
      }
    }
  }
  async validateAccessToken({ token }): Promise<any> {
    const { sub } = await this.decodeToken(token);
    const user = this.usersRepository.findById(sub);
    return user;
  }
  private async saveAccessToken(user: any, accessToken: string): Promise<void> {
    await this.redisClient.hset('maps:tokenToUserId', accessToken, user.id);
  }
  private validateCredentials(user: any, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
