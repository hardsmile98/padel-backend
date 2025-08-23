import { IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString({ message: 'Название группы должно быть строкой' })
  name: string;
}
