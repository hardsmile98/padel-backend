import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class UpdateMatchDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Первая команда должна быть числом' },
  )
  team1Id: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Вторая команда должна быть числом' },
  )
  team2Id: number;

  @IsArray({ message: 'Наборы должны быть массивом' })
  @IsOptional()
  sets: string[];

  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Победитель должен быть числом' },
  )
  winnerId: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Победитель должен быть числом' },
  )
  matchId: number;
}
