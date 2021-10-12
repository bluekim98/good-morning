import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { CreateType } from '@src/user/enum/create-type';
import { User } from '@src/user/user.entity';
import { UserService } from '../../user/providers/user.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
            callbackURL: process.env.KAKAO_CALLBACK_URL,
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const { username, emails } = profile;
        const email: string = profile._json.kakao_account.email;
        // const email: string = emails[0].value;
        const createUserDto: CreateUserDto = {
            email,
            createType: CreateType.Kakao,
        };

        const user: User = await this.userService.findOrCreate(createUserDto);
        const payload = {
            user,
            accessToken,
        };

        done(null, payload);
    }
}
