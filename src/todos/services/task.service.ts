import { Delete, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../models/Task';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}

  findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  findOne(id: string): Promise<Task> {
    return this.taskModel.findOne({
      where: { id },
    });
  }

  findByStatus(status: string): Promise<Task[]> {
    return this.taskModel.findAll({
      where: {
        status: status,
      },
    });
  }

  async create(task): Promise<Task> {
    return this.taskModel.create(task);
  }

  delete(id: string) {
    return this.taskModel.destroy({ where: { id: id } });
  }
}
