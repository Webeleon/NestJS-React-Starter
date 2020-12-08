import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';


@Injectable()
export class ConfigService {
  public readonly port: number;
  public readonly mongoUrl: string;

  constructor() {
    config();
    this.port = parseInt(process.env.PORT) || 5000;
    this.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/starter_webeleon'
  }
}
