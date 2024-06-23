import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CohortNotificationType } from '../entities/cohortNotification.entities';

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
  @IsNumber()
  receipient_id: number[];
}
