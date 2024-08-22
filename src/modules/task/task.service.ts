import { Injectable } from '@nestjs/common';
import { Status } from 'src/models/Status.model';
import { Tag } from 'src/models/Tag.model';
import { Task } from 'src/models/Task.model';
import { User } from 'src/models/User.model';

@Injectable()
export class TaskService {
  async getTasks(): Promise<Task[]> {
    return await Task.findAll({
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'password',
          'projectId',
          'statusId',
          'createdUserId',
        ],
      },
      include: [
        {
          as: 'users',
          model: User,
          attributes: {
            exclude: [
              'password',
              'lastLogin',
              'userGroupId',
              'createdAt',
              'updatedAt',
            ],
          },
          through: { attributes: [] },
        },
        {
          as: 'tags',
          model: Tag,
          attributes: {
            exclude: ['projectId', 'createdAt', 'updatedAt', 'createdUserId'],
          },
          through: { attributes: [] },
        },
        {
          as: 'status',
          model: Status,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'projectId',
              'createdUserId',
              'default',
            ],
          },
        },
      ],
    });
  }

  async getTaskById(id: number): Promise<any> {
    return await Task.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password', 'projectId'],
      },
      include: [
        {
          as: 'users',
          model: User,
          attributes: {
            exclude: [
              'password',
              'lastLogin',
              'userGroupId',
              'createdAt',
              'updatedAt',
            ],
          },
          through: { attributes: [] },
        },
        {
          as: 'tags',
          model: Tag,
          attributes: {
            exclude: ['projectId', 'createdAt', 'updatedAt', 'createdUserId'],
          },
          through: { attributes: [] },
        },
        {
          as: 'status',
          model: Status,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'projectId',
              'createdUserId',
              'default',
            ],
          },
        },
      ],
    })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async createTask(data): Promise<any> {
    return await Task.create(data)
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async updateTaskById(id: number, data): Promise<any> {
    return await Task.update(data, {
      where: { id },
      returning: true,
    })
      .then((data) => [null, data[1][0]])
      .catch((err) => [err]);
  }

  async deleteTaskById(id: number): Promise<any> {
    return await Task.destroy({ where: { id } })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
