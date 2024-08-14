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
import { Organization } from 'src/models/Organization.model';
import { OrganizationService } from './organization.service';
import {
  CreateOrganizationValidation,
  UpdateOrganizationValidation,
} from 'src/validators/organization.validation';
import slugify from 'slugify';
import { AuthGuard } from '../auth/auth.guard';
import { User } from 'src/models/User.model';

@Controller()
export default class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @UseGuards(AuthGuard)
  @Get('/organizations')
  async getOrganizations(@Req() req): Promise<Organization[]> {
    const { user } = req;

    const organizations = await this.organizationService.getOrganizations(
      user.id,
    );
    return organizations;
  }

  @Get('/organizations/:slug')
  async getOrganizationBySlug(@Param('slug') slug: string): Promise<string> {
    const [error, organization] =
      await this.organizationService.getOrganizationBySlug(slug);

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

  @Get('/organizations/:slug/users')
  async getOrganizationUsersByOrganizationSlug(
    @Param('slug') slug: string,
  ): Promise<User[]> {
    const [error, organization] =
      await this.organizationService.getOrganizationUsers(slug);

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

    return organization.users;
  }

  @UseGuards(AuthGuard)
  @Post('/organizations')
  async createOrganization(
    @Body() body: CreateOrganizationValidation,
    @Req() req,
  ): Promise<Organization> {
    const { user } = req;

    body['slug'] = slugify(body.title, { lower: true });
    body['createdUserId'] = user.id;

    const [error, organization] =
      await this.organizationService.createOrganization(body);

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    organization.$set('users', [user.id]);

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
