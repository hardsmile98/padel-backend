import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerDto {
  @IsString({ message: 'Slug должен быть строкой' })
  slug: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsOptional()
  firstName: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsOptional()
  lastName: string;

  @IsNumber()
  @IsOptional()
  raiting: number;

  @IsString({ message: 'Ссылка на фото должна быть строкой' })
  @IsOptional()
  photoUrl: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  description: string[];
}
