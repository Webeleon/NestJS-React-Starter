import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy} from "passport-local";
import {AuthService} from './auth.service';
import {SafeUser} from 'src/users/users.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<SafeUser> {
    const user = await this.authService.validate(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
