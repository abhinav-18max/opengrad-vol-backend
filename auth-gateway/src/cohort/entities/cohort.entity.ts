import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PocRelation } from '../../user/entities/poc.entity';
import { JoinTable } from 'typeorm';
import { VolRelation } from '../../user/entities/vol.entity';

@Entity({ name: 'Cohort' })
export class Cohort {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar', length: 255 }) name: string;
  @Column({ type: 'varchar', length: 255 }) startDate: string;
  @Column({ type: 'varchar', length: 255 }) endDate: string;
  @ManyToMany(() => PocRelation)
  @JoinTable()
  poc: PocRelation[];
  @ManyToMany(() => VolRelation)
  @JoinTable()
  vol: VolRelation[];
}
