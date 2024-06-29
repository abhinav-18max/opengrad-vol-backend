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

@Entity({ name: 'Log' })
export class Log {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => DailyLog, (daily) => daily.Logs)
  Date: DailyLog;
  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  activity: ActivityType;

  @Column({ type: 'varchar', nullable: true, length: 2550 }) details: string;

  @Column({ type: 'varchar', length: 256 })
  hourStart: string;

  @Column({ type: 'varchar', length: 256 }) minStart: string;

  @Column({ type: 'varchar', length: 256 }) hourEnd: string;

  @Column({ type: 'varchar', length: 256 }) minEnd: string;
}
