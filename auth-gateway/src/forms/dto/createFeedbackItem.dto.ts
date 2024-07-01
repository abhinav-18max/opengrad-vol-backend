import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export enum FeedbackItemType {
  DESCRIPTIVE = 'descriptive',
  'MULTIPLECHOICE' = 'multiplechoice',
}
export class CreateFeedbackItemDto {
  @IsNotEmpty()
  @IsEnum(FeedbackItemType)
  type: FeedbackItemType;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsOptional()
  @IsNumber()
  option_count: number;

  @IsNotEmpty()
  @IsArray()
  @IsString()
  options: string[];
}
