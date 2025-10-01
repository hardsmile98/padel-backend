import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateStageDto {
  @IsString({ message: 'Название этапа должно быть строкой' })
  name: string;

  @IsBoolean({ message: 'Должно быть булевым значением' })
  isFinal: boolean;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Порядок этапа должен быть числом' },
  )
  order: number;
}
