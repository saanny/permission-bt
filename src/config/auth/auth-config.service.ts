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
}
