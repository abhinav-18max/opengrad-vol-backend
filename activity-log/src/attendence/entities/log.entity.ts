import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DailyLog } from './daily-log.entity';

export enum ActivityType {
  'Content Creation' = 'Content Creation',
  'Mentoring' = 'Mentoring',
  'Design/Marketing' = 'Marketing',
  'Tech' = 'Tech',
  'Offline Outreach' = 'Offline Outreach',
  'Other' = 'Other',
}

@Entity({ name: 'logs' })
export class Log {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'int' }) vol_id: number;

  //@Column({ type: 'date', nullable: false }) Date: Date;
  @ManyToOne(() => DailyLog, (daily) => daily.timePeriod)
  Date: DailyLog;
  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  activity: ActivityType;

  @Column({ type: 'varchar', nullable: true, length: 2550 }) other: string;

  @Column({ type: 'time' })
  start: string;

  @Column({ type: 'time' }) end: string;
}
