import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Feedback } from './feedback.entity';

export enum FeedbackItemType {
  DESCRIPTIVE = 'descriptive',
  'MULTIPLECHOICE' = 'multiplechoice',
}

export class FeedbackItem {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'enum', enum: FeedbackItemType })
  type: FeedbackItemType;
  @Column({ type: 'varchar', length: 25500 }) question: string;
  @Column({ type: 'int', nullable: true }) option_count: number;
  @Column({ type: 'varchar', length: 25500, nullable: true, array: true })
  options: string[];
  @ManyToOne(() => Feedback, (feed) => feed.feedbackItems)
  feedback: Feedback;
}
