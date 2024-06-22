import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ActivityType } from '../entities/log.entity';

export class CreateLogDto {
  @IsNotEmpty()
  @IsNumber()
  vol_id: number;
  @IsNotEmpty()
  @IsEnum(ActivityType)
  activity: ActivityType;
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  start: string;
  @IsNotEmpty()
  @IsString()
  end: string;
  @IsNotEmpty()
  @IsString()
  other: string;
}
