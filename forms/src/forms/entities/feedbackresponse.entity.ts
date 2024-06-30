import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FeedbackitemResponse } from './feedbackitemresponse.entity';

@Entity({ name: 'FeedbackResponse' })
export class FeedbackResponse {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'int' }) form_id: number;
  @Column({ type: 'int' }) vol_id: number;
  @OneToMany(() => FeedbackitemResponse, (item) => item.feedbackResponse)
  feedbackitemResponses: FeedbackitemResponse[];
}
