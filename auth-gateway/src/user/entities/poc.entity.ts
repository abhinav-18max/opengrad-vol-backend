import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { VolRelation } from './vol.entity';
import { Cohort } from '../../cohort/entities/cohort.entity';

@Entity({ name: 'pocRelation' })
export class PocRelation {
  @PrimaryGeneratedColumn() id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user_id: User;
  @OneToMany(() => VolRelation, (vol) => vol.poc)
  vols: VolRelation[];
  @ManyToMany(() => Cohort, (cohort) => cohort.poc)
  cohorts: Cohort[];
}
