import { FeedbackItemType } from './feedbackitem.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FeedbackResponse } from './feedbackresponse.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'FeedbackitemResponse' })
export class FeedbackitemResponse {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'int' }) feedbackitem_id: number;
  @Column({ type: 'enum', enum: FeedbackItemType }) item_type: FeedbackItemType;
  @Column({ type: 'varchar', length: 256, nullable: true }) option_ans: string;
  @Column({ type: 'varchar', length: 2560, nullable: true }) descr_ans: string;
  @Column({ type: 'varchar', length: 2560 }) question: string;
  @ManyToOne(
    () => FeedbackResponse,
    (feedback) => feedback.feedbackitemResponses,
  )
  feedbackResponse: FeedbackResponse;
}
