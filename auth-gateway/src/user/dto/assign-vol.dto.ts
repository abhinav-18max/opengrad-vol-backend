import { IsNotEmpty, IsString } from 'class-validator';

export class AssignVolDto {
  @IsNotEmpty()
  @IsString()
  cohortId: number;

  @IsNotEmpty()
  @IsString()
  volRelationId: number;
}
