import { IsNumber } from 'class-validator';

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
}
