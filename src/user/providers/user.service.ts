import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findByEmail(email: string): Promise<User> {
        if (!email) return null;
        const user: User = await this.userRepository.findOne(email);
        if (!user) return null;

        const { isActive, tasks, ...anothers } = user;
        return anothers;
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findOrCreate(createUserDto: CreateUserDto): Promise<User> {
        const existingUser: User = await this.findByEmail(createUserDto.email);
        if (existingUser) return existingUser;

        const user: User = this.makeEntity(createUserDto);
        return await this.save(user);
    }

    private makeEntity(createUserDto: CreateUserDto) {
        const { email, nickname, createType } = createUserDto;
        const user: User = { email, nickname, createType, tasks: [] };
        return user;
    }
}
