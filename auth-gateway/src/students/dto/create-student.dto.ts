import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
  @IsNumber()
  @IsNotEmpty()
  volId: number;
  @IsNotEmpty()
  @IsNumber()
  cohortId: number;
}
