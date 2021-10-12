import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './providers/user.repository';

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
