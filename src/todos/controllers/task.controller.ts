import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { TaskDto } from '../dto/task.dto';

@Controller('todos')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  fetchAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Get('/status/:status')
  findByStatus(@Param('status') status: string): Promise<Task[]> {
    return this.taskService.findByStatus(status);
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  createTask(@Body() task: TaskDto): Promise<Task> {
    return this.taskService.create(task);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.taskService.delete(id);
  }
}
