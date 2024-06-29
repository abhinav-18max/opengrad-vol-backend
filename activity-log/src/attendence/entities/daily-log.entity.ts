import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Log } from './log.entity';

@Entity({ name: 'DailyLog' })
export class DailyLog {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'int' }) vol_id: number;

  @Column({ type: 'date', nullable: false }) Date: Date;

  @OneToMany(() => Log, (timely) => timely.Date)
  Logs: Log[];
}
