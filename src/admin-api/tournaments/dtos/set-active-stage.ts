import { IsNumber } from 'class-validator';

export class SetActiveStageDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'ID этапа должен быть числом' },
  )
  stageId: number;
}
