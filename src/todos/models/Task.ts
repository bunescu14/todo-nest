import { Column, Model, Table } from 'sequelize-typescript';
import { TaskStatus } from '../enums/task.status';

@Table
export class Task extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column({ defaultValue: TaskStatus.NEW })
  status: string;
}
