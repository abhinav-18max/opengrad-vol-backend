import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../auth/roles.enum';
@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'varchar', length: 255 }) name: string;

  @Column({ type: 'varchar', length: 255, unique: true }) email: string;

  @Column({ type: 'varchar', length: 255 }) password: string;

  @Column({ type: 'enum', enum: Role }) role: Role;
}
