import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { Transaction } from 'sequelize';
import {
  SessionRepository,
  SessionUpdateableProperties,
} from './session.repository';
import { AuthCacheService } from './auth.cache.service';
import { UserEntity } from './entity/user.entity';
import { AuthConfigService } from '../config/auth/auth-config.service';

export interface RefreshTokenPayload {
  jti: string;
  sub: string;
}

@Injectable()
export class SessionService {
  public constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly jwt: JwtService,
    private authConfigService: AuthConfigService,
    private readonly authCacheService: AuthCacheService,
  ) {}

  public async generateAccessToken(user: UserEntity): Promise<string> {
    const opts: SignOptions = {
      subject: String(user.id),
    };
    return this.jwt.signAsync({}, opts);
  }

  public async generateRefreshToken(
    sessionId: string | undefined,
    keepMeSignIn?: boolean,
  ): Promise<string> {
    if (!sessionId) {
      throw new Error('Invalid_Session');
    }

    const keepMeSignInExpirationTime = Number(
      this.authConfigService.KEEP_ME_SIGN_IN_EXPIRATION,
    );
    const refreshTokenExpirationTime = Number(
      this.authConfigService.REFRESH_TOKEN_EXPIRATION,
    );

    const opts: SignOptions = {
      expiresIn: keepMeSignIn
        ? keepMeSignInExpirationTime
        : refreshTokenExpirationTime,
      jwtid: String(sessionId),
    };
    const token = await this.jwt.signAsync(
      { keepMeSignIn: keepMeSignIn || undefined },
      opts,
    );

    if (sessionId) {
      const expiration = new Date();
      expiration.setTime(
        expiration.getTime() + this.authConfigService.SESSION_EXPIRATION,
      );
      await this.updateSession(
        {
          refreshToken: token,
          expires: expiration,
          isRevoked: false,
        },
        sessionId,
      );
    }

    return token;
  }

  public async getSessionByTokenAndId(sessionId: string, refreshToken: string) {
    return this.sessionRepository.getSession({
      id: sessionId,
      refreshToken: refreshToken,
    });
  }

  public async getSessionById(sessionId: string) {
    return this.sessionRepository.getSession({
      id: sessionId,
    });
  }

  public async addSession(user: UserEntity, timeZone: string) {
    return this.sessionRepository.addSession(user.id, timeZone);
  }

  public async updateSession(
    update: SessionUpdateableProperties,
    sessionId: string,
  ) {
    return this.sessionRepository.updateSession(update, sessionId);
  }

  public async resolveRefreshToken(encoded: string): Promise<string> {
    const { jti } = await this.decodeToken(encoded);
    if (!jti) {
      throw new Error('Refresh_Token_Malformed');
    }

    return jti;
  }

  async decodeToken(token: string): Promise<RefreshTokenPayload> {
    try {
      const decoded = await this.jwt.verifyAsync(token);
      return decoded;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new Error('Token_Expired');
      } else {
        throw new Error('Token_Malformed');
      }
    }
  }

  public async deleteSessions(
    userId: string,
    excludeSessions?: string[],
    transaction?: Transaction,
  ) {
    await this.authCacheService.deleteAccessTokens(userId, excludeSessions);
    return this.sessionRepository.revokedSessions(
      userId,
      excludeSessions,
      transaction,
    );
  }

  async getKeepMeSignIn(refreshToken: string) {
    try {
      const decoded = await this.jwt.decode(refreshToken);
      return decoded['keepMeSignIn'];
      // return decoded?.keepMeSignIn;
    } catch (e) {
      throw new Error('');
    }
  }
}
