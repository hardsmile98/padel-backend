import { IsNumber, IsString } from 'class-validator';

export class CreateStageDto {
  @IsString({ message: 'Название этапа должно быть строкой' })
  name: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Порядок этапа должен быть числом' },
  )
  order: number;
}
