import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FeedbackType } from '../entities/feedback.entity';
import { CreateFeedbackItemDto } from './createFeedbackItem.dto';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsEnum(FeedbackType)
  receipientType: FeedbackType;

  @IsNotEmpty()
  @IsNumber()
  @IsArray()
  receipientId: number[];

  @IsNotEmpty()
  @IsNumber()
  feedbackItemCount: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateFeedbackItemDto)
  feedbackItems: CreateFeedbackItemDto[];
}
