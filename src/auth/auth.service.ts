import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {SafeUser} from '../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ){}

  async validate(username: string, passwd: string): Promise<SafeUser|null> {
    const user = await this.usersService.getByUsername(username);
    if (user && this.usersService.checkPassword(user, passwd)) {
      return {
        username: user.username,
        email: user.email
      }
    }

    return null;
  }
}
