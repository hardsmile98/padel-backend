import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Родительская категория должна быть числом' },
  )
  player1Id: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Родительская категория должна быть числом' },
  )
  player2Id: number;

  @IsOptional()
  @IsString({ message: 'Тип команды должно быть строкой' })
  type?: string;
}
