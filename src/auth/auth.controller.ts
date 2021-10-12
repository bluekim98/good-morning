import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('kakao/redirect')
  @UseGuards(KakaoAuthGuard)
  async login(@Req() req: Request, @Res() res: Response): Promise<any> {
    const token = await this.authService.login(req.user);
    res.redirect(`http://localhost:3000/login?token=${token.access_token}`);
  }
}
