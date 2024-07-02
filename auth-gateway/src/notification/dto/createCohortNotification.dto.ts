import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
export enum CohortNotificationType {
  Message = 'message',
  Form = 'form',
}

export class CreateCohortNotificationDto {
  @IsNotEmpty()
  @IsEnum(CohortNotificationType)
  typeofnotification: CohortNotificationType;

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
