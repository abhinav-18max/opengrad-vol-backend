import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FeedbackItemType } from '../entities/feedbackitem.entity';

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
