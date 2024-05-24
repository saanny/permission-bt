import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get JWT_SECRET(): string {
    return this.configService.get<string>('Auth.JWT_SECRET');
  }

  get JWT_EXPIRES_IN_SECONDS(): string {
    return this.configService.get<string>('Auth.JWT_EXPIRES_IN_SECONDS');
  }

  get REFRESH_TOKEN_EXPIRATION(): string {
    return this.configService.get<string>('Auth.REFRESH_TOKEN_EXPIRATION');
  }

  get SESSION_EXPIRATION(): number {
    return parseInt(this.configService.get<string>('Auth.SESSION_EXPIRATION'));
  }

  get SKIP_SESSION_MANAGEMENT(): boolean {
    return this.configService.get<string>('Auth.SKIP_SESSION_MANAGEMENT') ===
      'true'
      ? true
      : false;
  }
  get KEEP_ME_SIGN_IN_EXPIRATION(): string {
    return this.configService.get<string>('Auth.KEEP_ME_SIGN_IN_EXPIRATION');
  }
}
