import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export enum PocNotificationType {
  Message = 'message',
  Form = 'form',
}
export class CreatePocNotificationDto {
  @IsNotEmpty()
  @IsEnum(PocNotificationType)
  typeofnotification: PocNotificationType;

  @IsNotEmpty()
  @IsString()
  Message: string;

  @IsNotEmpty()
  @IsNumber()
  form_id: number;

  @IsNotEmpty()
  @IsArray()
  receipient_id: number[];
}
