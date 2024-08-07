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
import { Project } from 'src/models/Project.model';
import { ProjectService } from './project.service';
import {
  CreateProjectValidation,
  UpdateProjectValidation,
} from 'src/validators/project.validation';
import slugify from 'slugify';

@Controller()
export default class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('/projects')
  async getProjects(): Promise<Project[]> {
    const projects = await this.projectService.getProjects();
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
