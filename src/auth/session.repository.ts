import { SESSION_REPOSITORY } from './auth.const';
import { Inject, Injectable } from '@nestjs/common';
import { Op, Transaction, WhereOptions } from 'sequelize';
import { SessionEntity } from './entity/session.entity';
export class SessionUpdateableProperties {
  expires?: Date;
  refreshToken?: string;
  isRevoked?: boolean;
  isTrusted?: boolean;
}

@Injectable()
export class SessionRepository {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private sessionRepository: typeof SessionEntity,
  ) {}

  public async updateSession(
    update: SessionUpdateableProperties,
    sessionId: string,
  ): Promise<[affectedCount: number]> {
    return this.sessionRepository.update(update, {
      where: {
        id: sessionId,
      },
    });
  }

  public async addSession(
    userId: string,
    timeZone: string,
  ): Promise<SessionEntity> {
    return this.sessionRepository.create({
      userId,
      isRevoked: false,
      timeZone,
    });
  }

  public async getSessionById(id: string): Promise<SessionEntity | null> {
    return this.sessionRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async getSession(
    query: WhereOptions<SessionEntity>,
  ): Promise<SessionEntity | null> {
    return this.sessionRepository.findOne({
      where: query,
    });
  }

  public async revokedSessions(
    userId: string,
    excludeSessions?: string[],
    transaction?: Transaction,
  ) {
    return this.sessionRepository.update(
      {
        isRevoked: true,
      },
      {
        where: {
          [Op.and]: [
            { userId },
            excludeSessions.length > 0
              ? {
                  id: {
                    [Op.notIn]: excludeSessions,
                  },
                }
              : {},
          ],
        },
        transaction,
      },
    );
  }
}
