import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { PocRelation } from './poc.entity';
import { Cohort } from '../../cohort/entities/cohort.entity';

@Entity({ name: 'volRelation' })
export class VolRelation {
  @PrimaryGeneratedColumn() id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user_id: User;
  @ManyToOne(() => PocRelation, (poc) => poc.vols)
  poc: PocRelation;
  @ManyToMany(() => Cohort, (cohort) => cohort.vol)
  cohorts: Cohort[];
}
