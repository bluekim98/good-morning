import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { Task } from './task.entity';
import { TaskService } from './providers/task.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import * as moment from 'moment';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('/:email')
    async findTask(
        @Req() req: any,
        @Param('email') email: string,
        @Query('targetDay') targetDay: string,
    ) {
        if (req.user.email !== email) return;

        const option: FindManyOptions<Task> = {
            where: { userEmail: email, targetDay },
            order: { ['id']: 'ASC' },
        };
        const task = await this.taskService.findByOption(option);

        return task;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async removeTask(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
        const author = req.user;
        const result = await this.taskService.removeTask(id, author);
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('user')
    async createTask(@Req() req: any, @Body() createTaskDto: CreateTaskDto) {
        const email = req.user?.email;
        if (!email) return;

        const result = await this.taskService.createTask(createTaskDto, email);
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    async updateTask(
        @Req() req: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        const author = req.user;

        const result = await this.taskService.updateTask(
            id,
            updateTaskDto,
            author,
        );
        return result;
    }
}
