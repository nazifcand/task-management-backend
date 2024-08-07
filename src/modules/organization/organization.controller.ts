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
} from '@nestjs/common';
import { Organization } from 'src/models/Organization.model';
import { OrganizationService } from './organization.service';
import {
  CreateOrganizationValidation,
  UpdateOrganizationValidation,
} from 'src/validators/organization.validation';
import slugify from 'slugify';

@Controller()
export default class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get('/organizations')
  async getOrganizations(): Promise<Organization[]> {
    const organizations = await this.organizationService.getOrganizations();
    return organizations;
  }

  @Get('/organizations/:organizationId')
  async getOrganizationById(
    @Param('organizationId') organizationId: string,
  ): Promise<string> {
    const [error, organization] =
      await this.organizationService.getOrganizationById(
        Number(organizationId),
      );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found organization
    if (!organization) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return organization;
  }

  @Post('/organizations')
  async createOrganization(
    @Body() body: CreateOrganizationValidation,
  ): Promise<Organization> {
    body['slug'] = slugify(body.title, { lower: true });

    const [error, organization] =
      await this.organizationService.createOrganization(body);

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return organization;
  }

  @Put('/organizations/:organizationId')
  async updateOrganization(
    @Param('organizationId') organizationId: string,
    @Body() body: UpdateOrganizationValidation,
  ): Promise<string> {
    if (body.title) {
      body['slug'] = slugify(body.title, { lower: true });
    }

    const [error, organization] =
      await this.organizationService.updateOrganizationById(
        Number(organizationId),
        body,
      );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found organization
    if (!organization) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return organization;
  }

  @Delete('/organizations/:organizationId')
  async deleteOrganization(
    @Param('organizationId') organizationId: string,
  ): Promise<string> {
    const [error, organization] =
      await this.organizationService.deleteOrganizationById(
        Number(organizationId),
      );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found organization
    if (!organization) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return organization;
  }
}
