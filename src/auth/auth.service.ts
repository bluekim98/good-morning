import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(paylod: any) {
    const user: User = paylod.user;

    const payload = {
      email: user.email,
      username: user.nickname || 'Social Login',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
