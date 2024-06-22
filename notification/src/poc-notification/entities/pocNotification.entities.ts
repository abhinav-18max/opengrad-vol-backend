import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PocNotificationType {
  Message = 'message',
  Form = 'form',
}
@Entity({ name: 'PocNotification' })
export class PocNotification {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'enum', enum: PocNotificationType })
  typeofnotification: PocNotificationType;
  @Column({ type: 'varchar', length: 25500, nullable: true }) Message: string;
  @Column({ type: 'int', nullable: true }) form_id: number;
  @Column({ type: 'int', nullable: false })
  receipient_id: number;
}
