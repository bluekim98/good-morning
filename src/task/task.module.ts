import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { TaskService } from './providers/task.service';
import { TaskController } from './task.controller';
import { UserModule } from '@src/user/user.module';
import { TaskRepository } from './providers/task.repository';

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        TypeOrmModule.forFeature([TaskRepository]),
    ],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService],
})
export class TaskModule {}
