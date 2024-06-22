import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { VolRelation } from './vol.entity';

@Entity({ name: 'pocRelation' })
export class PocRelation {
  @PrimaryGeneratedColumn() id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user_id: User;
  @OneToMany(() => VolRelation, (vol) => vol.poc)
  vols: VolRelation[];
}
