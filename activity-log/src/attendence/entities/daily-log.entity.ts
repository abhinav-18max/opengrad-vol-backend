import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Log } from './log.entity';

@Entity({ name: 'daily-log' })
export class DailyLog {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'int' }) vol_id: number;

  @Column({ type: 'date', nullable: false }) Date: string;

  @OneToMany(() => Log, (timely) => timely.Date)
  timePeriod: Log[];
}
