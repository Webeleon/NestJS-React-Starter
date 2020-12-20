import { Test, TestingModule } from '@nestjs/testing';
import {MongooseModule} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersService } from './users.service';
import {rootMongooseTestModule, closeInMongodConnection} from '../test-utils/mongo/MongooseTestModule';
import {USER_MODEL_NAME, UserSchema, UserDocument, User} from './users.schema';

describe('UsersService', () => {
  let userService: UsersService;
  let UserModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: USER_MODEL_NAME, schema: UserSchema }
        ]),
      ],
      providers: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    UserModel = module.get(USER_MODEL_NAME + 'Model');
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('get by username', async () => {
    expect(await userService.getByUsername('nope')).toEqual(null);
    await UserModel.create({
      username: 'coco',
      email: 'test@webeleon.dev',
      passwordHash: 'not real hash',
      passwordSalt: 'note real salt',
    });
    const coco = await userService.getByUsername('coco');
    expect(coco.email).toEqual('test@webeleon.dev');
  });

  it('create new user', async () => {
    const safeCoco: any = await userService.create('coco', 'coco', 'coco@webeleon.dev');
    expect(safeCoco.passwordHash).toBeUndefined();
    
    const dbCoco = await UserModel.findOne({ username: 'coco' });
    expect(dbCoco).toBeDefined();
    expect(dbCoco.passwordHash).not.toEqual('coco');
  });

  it('check password hash', async () => {
    await userService.create('coco', 'password', 'coco@webeleon.dev');
    const coco = await userService.getByUsername('coco');
    expect(await userService.checkPassword(coco, 'password')).toBeTruthy();
    expect(await userService.checkPassword(coco, 'invalid')).toBeFalsy();
  }); 
});
