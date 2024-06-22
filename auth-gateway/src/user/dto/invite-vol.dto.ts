import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InviteVolDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  Poc: number;
}
