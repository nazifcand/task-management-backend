import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Task } from 'src/models/Task.model';
import { TaskService } from './task.service';
import {
  CreateTaskValidation,
  UpdateTaskValidation,
} from 'src/validators/task.validation';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export default class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/tasks')
  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskService.getTasks();
    return tasks;
  }

  @Get('/tasks/:taskId')
  async getTaskById(@Param('taskId') taskId: string): Promise<string> {
    const [error, task] = await this.taskService.getTaskById(Number(taskId));

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found task
    if (!task) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  @Post('/tasks')
  async createTask(
    @Req() req,
    @Body() body: CreateTaskValidation,
  ): Promise<Task> {
    body['createdUserId'] = req.user.id;

    const [error, createdTask] = await this.taskService.createTask(body);

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // set task users
    if (body.users) {
      createdTask.$set('users', body.users);
    }

    // set task tags
    if (body.tags) {
      createdTask.$set('tags', body.tags);
    }

    return createdTask;
  }

  @Put('/tasks/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() body: UpdateTaskValidation,
  ): Promise<string> {
    const [error, updatedTask] = await this.taskService.updateTaskById(
      Number(taskId),
      body,
    );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found Task
    if (!updatedTask) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    // set task users
    if (body.users) {
      updatedTask.$set('users', body.users);
    }

    // set task tags
    if (body.tags) {
      updatedTask.$set('tags', body.tags);
    }

    return updatedTask;
  }

  @Delete('/tasks/:taskId')
  async deleteTask(@Param('taskId') taskId: string): Promise<string> {
    const [error, task] = await this.taskService.deleteTaskById(Number(taskId));

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found Task
    if (!task) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return task;
  }
}
