import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeedbackItem } from './feedbackitem.entity';

export enum FeedbackType {
  COHORT = 'cohort',
  POC = 'poc',
}

export class Feedback {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'enum', enum: FeedbackType }) recipientType: FeedbackType;
  @Column({ type: 'int', array: true }) recipientId: number[];
  @Column({ type: 'int' }) feedbackIitemCount: number;
  @OneToMany(() => FeedbackItem, (item) => item.feedback)
  feedbackItems: FeedbackItem[];
}
