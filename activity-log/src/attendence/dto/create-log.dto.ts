import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ActivityType } from '../entities/log.entity';

export class CreateLogDto {
  @IsEnum(ActivityType)
  @IsNotEmpty()
  activity: ActivityType;
  @IsNotEmpty()
  @IsString()
  hourStart: string;
  @IsNotEmpty()
  @IsString()
  minStart: string;
  @IsNotEmpty()
  @IsString()
  hourEnd: string;
  @IsNotEmpty()
  @IsString()
  minEnd: string;
  @IsString()
  @IsOptional()
  details: string;
}
