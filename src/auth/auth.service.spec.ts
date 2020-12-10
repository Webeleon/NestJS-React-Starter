import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import {rootMongooseTestModule} from '../test-utils/mongo/MongooseTestModule';
import {UsersModule} from '../users/users.module';
import {UsersService} from '../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        UsersModule,
      ],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('validate return user if valid password', async () => {
    await userService.create('coco', 'password', 'coco@webeleon.dev');
    const coco = await authService.validate('coco', 'password');
    expect(coco.email).toEqual('coco@webeleon.dev');
  });

  it('return null if the password is invalid or user does not exist', async () => {
    await userService.create('coco', 'password', 'coco@webeleon.dev');
    const coco = await authService.validate('coco', 'nope');
    expect(coco).toBeNull();

    expect(await authService.validate('foo', 'bar')).toBeNull();
  });
});
