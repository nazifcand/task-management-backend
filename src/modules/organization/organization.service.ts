import { Injectable } from '@nestjs/common';
import { Organization } from 'src/models/Organization.model';

@Injectable()
export class OrganizationService {
  async getOrganizations(): Promise<Organization[]> {
    return await Organization.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
    });
  }

  async getOrganizationBySlug(slug: string): Promise<any> {
    return await Organization.findOne({
      where: { slug },
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
    })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async createOrganization(data): Promise<any> {
    return await Organization.create(data)
      .then((data) => [null, data])
      .catch((err) => [err]);
  }

  async updateOrganizationById(id: number, data): Promise<any> {
    return await Organization.update(data, {
      where: { id },
      returning: true,
    })
      .then((data) => [null, data[1][0]])
      .catch((err) => [err]);
  }

  async deleteOrganizationById(id: number): Promise<any> {
    return await Organization.destroy({ where: { id } })
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
