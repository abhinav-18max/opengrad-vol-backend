import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignVolDto {
  @IsNotEmpty()
  @IsNumber()
  cohortId: number;

  @IsNotEmpty()
  @IsNumber()
  volRelationId: number;
}
