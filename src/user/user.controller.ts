import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UserService } from './providers/user.service';
import { Request } from 'express';
import { ServiceStatus } from '@src/common/dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUser(@Req() req: Request) {
        return req.user;
    }

    @Get(':email')
    async findUserByEmail(
        @Param() email: string,
    ): Promise<ServiceStatus<User>> {
        const user: User = await this.userService.findByEmail(email);
        if (!user)
            throw new HttpException('Incorrect access', HttpStatus.BAD_REQUEST);

        const response: ServiceStatus<User> = {
            data: user,
            status: true,
        };
        return response;
    }
}
