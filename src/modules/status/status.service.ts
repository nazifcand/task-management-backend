import { Injectable } from '@nestjs/common';
import { Status } from 'src/models/Status.model';

@Injectable()
export class StatusService {
  async getStatuss(): Promise<Status[]> {
    return await Status.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'taskId'],
      },
    });
  }

  async getStatusById(id: number): Promise<any> {
    return await Status.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'taskId'],
      },
    })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async createStatus(data): Promise<any> {
    return await Status.create(data)
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async updateStatusById(id: number, data): Promise<any> {
    return await Status.update(data, {
      where: { id },
      returning: true,
    })
      .then((data) => [null, data[1][0]])
      .catch((err) => [err]);
  }

  async deleteStatusById(id: number): Promise<any> {
    return await Status.destroy({ where: { id } })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
