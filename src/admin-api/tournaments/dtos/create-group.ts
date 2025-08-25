import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString({ message: 'Название группы должно быть строкой' })
  name: string;

  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'ID категории должно быть числом' },
  )
  categoryId?: string;
}
