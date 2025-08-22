import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { Public } from '../../common/decorators';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { token } = await this.authService.login(loginDto);

    res.cookie('auth-token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.send({ message: 'Вы успешно авторизовались' });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('auth-token');

    res.send({ message: 'Вы успешно вышли из системы' });
  }
}
