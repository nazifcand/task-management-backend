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
  Query,
  UseGuards,
} from '@nestjs/common';
import { Project } from 'src/models/Project.model';
import { ProjectService } from './project.service';
import {
  CreateProjectValidation,
  UpdateProjectValidation,
} from 'src/validators/project.validation';
import slugify from 'slugify';
import { AuthGuard } from '../auth/auth.guard';
import { Tag } from 'src/models/Tag.model';
import { Status } from 'src/models/Status.model';

@UseGuards(AuthGuard)
@Controller()
export default class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('/projects')
  async getProjects(
    @Query('organizationId') organizationId,
  ): Promise<Project[]> {
    const projects = await this.projectService.getProjects({
      organizationId,
    });
    return projects;
  }

  @Get('/projects/:slug')
  async getProjectById(@Param('slug') slug: string): Promise<string> {
    const [error, project] = await this.projectService.getProjectBySlug(slug);

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found project
    if (!project) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return project;
  }

  @Get('/projects/:slug/tags')
  async getProjectTags(@Param('slug') slug: string): Promise<Tag[]> {
    const [error, project] = await this.projectService.getProjectTags(slug);

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found project
    if (!project) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return project.tags;
  }

  @Get('/projects/:slug/statuses')
  async getProjectStatuses(@Param('slug') slug: string): Promise<Status[]> {
    const [error, project] = await this.projectService.getProjectStatuses(slug);

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found project
    if (!project) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return project.statuses;
  }

  @Post('/projects')
  async createProject(@Body() body: CreateProjectValidation): Promise<Project> {
    body['slug'] = slugify(body.title, { lower: true });

    const [error, project] = await this.projectService.createProject(body);

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return project;
  }

  @Put('/projects/:projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectValidation,
  ): Promise<string> {
    if (body.title) {
      body['slug'] = slugify(body.title, { lower: true });
    }

    const [error, project] = await this.projectService.updateProjectById(
      Number(projectId),
      body,
    );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found project
    if (!project) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return project;
  }

  @Delete('/projects/:projectId')
  async deleteProject(@Param('projectId') projectId: string): Promise<string> {
    const [error, project] = await this.projectService.deleteProjectById(
      Number(projectId),
    );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found project
    if (!project) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return project;
  }
}
