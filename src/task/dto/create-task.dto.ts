import { TaskType } from '../enum';

export class CreateTaskDto {
  targetDay: string;
  text: string;
  taskType: TaskType;
}
