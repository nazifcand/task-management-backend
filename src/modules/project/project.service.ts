import { Injectable } from '@nestjs/common';
import { Project } from 'src/models/Project.model';

@Injectable()
export class ProjectService {
  async getProjects(): Promise<Project[]> {
    return await Project.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'organizationId'] },
    });
  }

  async getProjectBySlug(slug: string): Promise<any> {
    return await Project.findOne({
      where: { slug },
      attributes: { exclude: ['createdAt', 'updatedAt', 'organizationId'] },
    })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async createProject(data): Promise<any> {
    return await Project.create(data)
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async updateProjectById(id: number, data): Promise<any> {
    return await Project.update(data, {
      where: { id },
      returning: true,
    })
      .then((data) => [null, data[1][0]])
      .catch((err) => [err]);
  }

  async deleteProjectById(id: number): Promise<any> {
    return await Project.destroy({ where: { id } })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
