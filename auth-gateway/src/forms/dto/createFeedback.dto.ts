import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateFeedbackItemDto } from './createFeedbackItem.dto';
export enum FeedbackType {
  COHORT = 'cohort',
  POC = 'poc',
}

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
