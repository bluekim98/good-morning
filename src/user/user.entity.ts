import { Task } from '../task/task.entity';
import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CreateType } from './enum';

@Entity()
export class User {
  @PrimaryColumn({ name: 'email' })
  email: string;

  @Column({
    nullable: true,
  })
  nickname?: string;

  @Column({ type: 'varchar', name: 'create_type' })
  createType: CreateType;

  @JoinColumn({ name: 'email' })
  @OneToMany((type) => Task, (task) => task.user)
  tasks?: Task[];

  @Column({
    type: 'varchar',
    default: true,
    name: 'is_active',
  })
  isActive?: boolean;

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
