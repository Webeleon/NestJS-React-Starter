import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';


@Injectable()
export class ConfigService {
  public readonly port: number;

  constructor() {
    config();
    this.port = parseInt(process.env.PORT) || 5000;
  }
}
