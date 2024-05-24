import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthCacheService } from './auth.cache.service';
import { UserEntity } from './entity/user.entity';
import { SessionService } from './session.service';
import { UserRepository } from './user.repository';
export class RegisterUserDto {
  email: string;
  password: string;
}
export class LoginWithCredentialDto {
  email: string;
  password: string;
  keepMeSignIn: boolean;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
    private readonly authCacheService: AuthCacheService,
  ) {}

  validateCredentials(user: UserEntity, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async setPassword(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    user.set('password', await this.hashPassword(password));
    await user.save();
  }

  async refreshAccessToken(refreshToken: string, sessionId: string) {
    const tokenSessionId =
      await this.sessionService.resolveRefreshToken(refreshToken);
    if (sessionId !== tokenSessionId) {
      throw new Error('Invlaid_Session');
    }

    const session = await this.sessionService.getSessionByTokenAndId(
      tokenSessionId,
      refreshToken,
    );

    const user = await this.userRepository.findUserById(session.userId);

    const keepMeSignIn =
      await this.sessionService.getKeepMeSignIn(refreshToken);
    const {
      accessToken,
      refreshToken: newRefreshToken,
      status,
    } = await this.loginUser(user, tokenSessionId, keepMeSignIn);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      status,
      user,
    };
  }

  async registerUser(data: RegisterUserDto) {
    console.log(data);

    try {
      data.password = await this.hashPassword(data.password);
      const user = await this.userRepository.registerUser(data);
      await user.save();

      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }

  async loginUser(user: UserEntity, sessionId: string, keepMeSignIn?: boolean) {
    const accessToken = await this.sessionService.generateAccessToken(user);
    const refreshToken = await this.sessionService.generateRefreshToken(
      sessionId,
      keepMeSignIn,
    );
    await this.authCacheService.saveAccessToken(
      user.id,
      accessToken,
      sessionId,
    );

    return {
      status: 'success',
      user: {
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
      sessionId,
    };
  }

  async loginWithCredential(data: any) {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      if (!user) {
        throw new Error('Account_Not_Valid');
      }
      const valid = user
        ? await this.validateCredentials(user, data.password)
        : false;
      if (!valid) {
        throw new Error('Password_Not_Valid');
      }
      if (!data.sessionId) {
        const session = await this.sessionService.addSession(
          user,
          data.timeZone,
        );
        data.sessionId = session.id;
      }

      return this.loginUser(user, data.sessionId, data.keepMeSignIn);
    } catch (error) {
      console.log(error);
    }
  }
  async validateAccessToken({ token }) {
    const { sub } = await this.sessionService.decodeToken(token);
    const user = this.userRepository.findUserById(sub);
    return user;
  }
}
