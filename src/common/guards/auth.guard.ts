import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  cookies: {
    [key: string]: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<CustomRequest>();

    const jwtToken = req.cookies['auth-token'];

    if (!jwtToken) {
      throw new UnauthorizedException('Необходима авторизация');
    }

    try {
      jwt.verify<{ userId: number }>(jwtToken, this.jwtSecret);

      return true;
    } catch (error) {
      req.res.clearCookie('auth-token');

      throw new UnauthorizedException('Неверный токен');
    }
  }
}
