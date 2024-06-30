import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Generated } from 'typeorm';
import { Role } from '../../auth/roles.enum';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegex, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @IsEnum(Role)
  @IsNotEmpty({
    message: 'Role is required',
  })
  role: Role;
}
