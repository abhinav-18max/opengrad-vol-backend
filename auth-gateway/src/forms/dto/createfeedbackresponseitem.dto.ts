import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
export enum FeedbackItemType {
  DESCRIPTIVE = 'descriptive',
  'MULTIPLECHOICE' = 'multiplechoice',
}
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
