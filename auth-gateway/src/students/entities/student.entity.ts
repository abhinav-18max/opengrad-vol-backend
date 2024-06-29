import { PrimaryGeneratedColumn } from 'typeorm';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Student' })
export class Student {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar', length: 256 }) name: string;
  @Column({ type: 'varchar', length: 256 }) email: string;
  @Column({ type: 'varchar', length: 256 }) phone: string;
  @Column({ type: 'int' }) volId: number;
  @Column({ type: 'int' }) cohortId: number;
}
