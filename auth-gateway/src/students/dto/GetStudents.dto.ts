import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetStudentsDto {
  @IsNumber()
  @IsNotEmpty()
  volId: number;
  @IsNotEmpty()
  @IsNumber()
  cohortId: number;
}
