import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Название категории должно быть строкой' })
  name: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Порядок категории должен быть числом' },
  )
  order: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Родительская категория должна быть числом' },
  )
  @IsOptional()
  parentCategoryId: number;
}
