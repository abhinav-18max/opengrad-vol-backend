import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CohortNotificationType {
  Message = 'message',
  Form = 'form',
}
@Entity({ name: 'cohortNotification' })
export class CohortNotification {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'enum', enum: CohortNotificationType })
  typeofnotification: CohortNotificationType;
  @Column({ type: 'varchar', length: 25500, nullable: true }) Message: string;
  @Column({ type: 'int', nullable: true }) form_id: number;
  @Column({ type: 'int', nullable: false })
  receipient_id: number;
}
