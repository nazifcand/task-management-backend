import { Injectable } from '@nestjs/common';
import { Tag } from 'src/models/Tag.model';

@Injectable()
export class TagService {
  async getTags(): Promise<Tag[]> {
    return await Tag.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async getTagById(id: number): Promise<any> {
    return await Tag.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async createTag(data): Promise<any> {
    return await Tag.create(data)
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async updateTagById(id: number, data): Promise<any> {
    return await Tag.update(data, {
      where: { id },
      returning: true,
    })
      .then((data) => [null, data[1][0]])
      .catch((err) => [err]);
  }

  async deleteTagById(id: number): Promise<any> {
    return await Tag.destroy({ where: { id } })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
