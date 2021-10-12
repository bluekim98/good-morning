import { Global, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'config/.env' });
import { DEV_CONFIG, APP_CONFIG } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
    imports: [TypeOrmModule.forRoot(APP_CONFIG)],
})
export class DatabaseModule {}
