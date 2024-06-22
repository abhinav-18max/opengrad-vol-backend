import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InvitePocDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
