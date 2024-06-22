import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { PocRelation } from './poc.entity';

@Entity({ name: 'volRelation' })
export class VolRelation {
  @PrimaryGeneratedColumn() id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user_id: User;
  @ManyToOne(() => PocRelation, (poc) => poc.vols)
  poc: PocRelation;
}
