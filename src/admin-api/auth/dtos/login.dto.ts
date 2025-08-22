import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Логин должен быть строкой' })
  @MinLength(4, { message: 'Логин должен быть не менее 4 символов' })
  login: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;
}
