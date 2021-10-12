import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskType } from './enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'task_type', type: 'varchar' })
  taskType: TaskType;

  @Column({ name: 'target_day', type: 'varchar', nullable: false })
  targetDay: string;

  @Column({ name: 'text', nullable: false })
  text: string;

  @Column({ type: 'bool', width: 1, default: false, name: 'done' })
  done?: boolean;

  @Column({ name: 'user_email', type: 'varchar', nullable: false })
  userEmail: string;

  @JoinColumn({ name: 'user_email', referencedColumnName: 'email' })
  @ManyToOne((type) => User, (user) => user.tasks)
  user?: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'create_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'update_at',
  })
  updatedAt?: Date;
}
