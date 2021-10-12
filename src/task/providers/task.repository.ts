import { BaseRepository } from '@src/common/provider/base.repository';
import { EntityRepository } from 'typeorm';
import { Task } from '../task.entity';

@EntityRepository(Task)
export class TaskRepository extends BaseRepository<Task> {}
