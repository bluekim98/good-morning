import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Task } from '../task.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { User } from '@src/user/user.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ServiceStatus } from '@src/common/dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async findByOption(option: FindOneOptions<Task>) {
        const tasks = await this.taskRepository.find(option);
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, userEmail: string) {
        const { text, targetDay, taskType } = createTaskDto;
        const task: Task = {
            text,
            targetDay,
            taskType,
            userEmail,
        };
        const result = await this.taskRepository.save(task);
        return result;
    }

    async removeTask(id: number, author: User): Promise<ServiceStatus<any>> {
        const task = await this.findById(id);
        if (!task) return { status: false };

        this.checkAuth(author, task);

        try {
            const result = await this.taskRepository.remove([task]);
        } catch (error) {
            console.log(error);
            return { status: false, error: error };
        }
        return { status: true };
    }

    async updateTask(
        id: number,
        updateTaskDto: UpdateTaskDto,
        author: User,
    ): Promise<ServiceStatus<Task>> {
        const task = await this.findById(id);
        if (!task) return { status: false };

        this.checkAuth(author, task);

        task.done = updateTaskDto.done ?? task.done;

        const updatedTask = await this.taskRepository.save(task);
        return { data: updatedTask, status: true };
    }

    private async findById(id: number): Promise<Task> {
        if (!id) return null;
        const tasks: Task[] = await this.taskRepository.findByIds([id]);
        let task: Task;
        if (tasks.length) task = tasks[0];
        return task;
    }

    private checkAuth(author: User, task: Task) {
        if (author.email !== task.userEmail) {
            throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
        }
    }
}
