import { IsString } from 'class-validator';

export class CreateTournamentDto {
  @IsString({ message: 'Название турнира должно быть строкой' })
  name: string;
}
