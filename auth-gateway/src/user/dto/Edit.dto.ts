import { IsNotEmpty, IsString } from 'class-validator';

export class EditDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
