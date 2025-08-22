import { DbService } from '../../common/db';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import * as jwt from 'jsonwebtoken';
import { admins } from 'src/common/db/schema';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    private readonly dbService: DbService,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;

    const loginFormatted = login.toLowerCase();

    const [user] = await this.dbService.db
      .select()
      .from(admins)
      .where(eq(admins.login, loginFormatted));

    if (!user) {
      throw new BadRequestException('Неверный логин');
    }

    if (user.password !== password) {
      throw new BadRequestException('Неверный пароль');
    }

    const jwtToken = jwt.sign({ userId: user.id }, this.jwtSecret);

    return {
      token: jwtToken,
    };
  }
}
