import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { Request } from 'express';
import { Redis } from 'ioredis';
import { PinoLogger } from 'nestjs-pino';
import { UsersServiceImpl } from 'src/services/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private usersService: UsersServiceImpl,
    private readonly logger: PinoLogger,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async canActivate(context: ExecutionContext) {
    this.logger.setContext(context.getClass().name);

    const request = this.getRequest<Request & { user?: any }>(context);
    try {
      const token = this.getToken(request);
      const user = await this.usersService.validateAccessToken({ token });
      if (!user) {
        throw new UnauthorizedException();
      }
      const storedId = await this.redisClient.hget('maps:tokenToUserId', token);

      if (!storedId) {
        throw new UnauthorizedException();
      }

      request.user = user;
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Token Not Valid');
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  getToken(request: { headers: Record<string, string | string[]> }): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new UnauthorizedException('Token Not In Header');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = authorization.split(' ');
    return token;
  }
}
