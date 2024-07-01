import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { FeedbackitemResponseDto } from './createfeedbackresponseitem.dto';

export class CreateFeedbackResponseDto {
  @IsNumber()
  @IsNotEmpty()
  form_id: number;

  @IsNumber()
  @IsNotEmpty()
  vol_id: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FeedbackitemResponseDto)
  feedbackitemResponses: FeedbackitemResponseDto[];
}
