import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { FeedbackItemType } from '../entities/feedbackitem.entity';

export class FeedbackitemResponseDto {
  @IsNumber()
  @IsNotEmpty()
  feedbackitem_id: number;

  @IsNotEmpty()
  @IsEnum(FeedbackItemType)
  item_type: FeedbackItemType;
  @IsNotEmpty()
  @IsString()
  descr_ans: string;

  @IsNotEmpty()
  @IsString()
  option_ans: string;

  @IsNotEmpty()
  @IsString()
  question: string;
}
