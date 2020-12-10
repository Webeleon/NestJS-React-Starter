import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';

import {USER_MODEL_NAME, UserDocument, SafeUser, User} from './users.schema';

interface hashedPasswd {
  hash: string;
  salt: string
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL_NAME) private readonly UserModel: Model<UserDocument>
  ){}

  async getByUsername(username: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({ username });
  }

  async create(username: string, passwd: string, email: string): Promise<SafeUser> {
    const { hash, salt } = this.hashPassword(passwd);
    const user = await this.UserModel.create({
      username, email,
      passwordHash: hash,
      passwordSalt: salt,
    });
    
    const { passwordHash, passwordSalt, ...safeUser } = user;
    return safeUser;
  }

  checkPassword(user: User, passwd: string): boolean {
    const hash = crypto.createHash('sha512');
    hash.update(`${passwd}${user.passwordSalt}`);
    return user.passwordHash === hash.digest('hex');
  }

  hashPassword(password: string): hashedPasswd {
    const hash = crypto.createHash('sha512');
    const salt = crypto.randomBytes(256).toString('hex');
    hash.update(`${password}${salt}`);
    return {
      hash: hash.digest('hex'),
      salt,
    };
  }
}
