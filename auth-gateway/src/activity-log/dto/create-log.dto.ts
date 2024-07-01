import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export enum ActivityType {
  'Content Creation' = 'Content Creation',
  'Mentoring' = 'Mentoring',
  'Design/Marketing' = 'Marketing',
  'Tech' = 'Tech',
  'Offline Outreach' = 'Offline Outreach',
  'Other' = 'Other',
}

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
