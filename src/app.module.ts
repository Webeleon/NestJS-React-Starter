import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import {ConfigService} from './config/config.service';

const configs = new ConfigService;

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(configs.mongoUrl), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
