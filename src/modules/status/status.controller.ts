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
import { Status } from 'src/models/Status.model';

import { StatusService } from './status.service';
import {
  CreateStatusValidation,
  UpdateStatusValidation,
} from 'src/validators/status.validation';

@Controller()
export default class StatusController {
  constructor(private statusService: StatusService) {}

  @Get('/statuses')
  async getStatuss(): Promise<Status[]> {
    const statuses = await this.statusService.getStatuss();
    return statuses;
  }

  @Get('/statuses/:statusId')
  async getStatusById(@Param('statusId') statusId: string): Promise<string> {
    const [error, status] = await this.statusService.getStatusById(
      Number(statusId),
    );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found status
    if (!status) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return status;
  }

  @Post('/statuses')
  async createStatus(@Body() body: CreateStatusValidation): Promise<Status> {
    const [error, createdStatus] = await this.statusService.createStatus(body);

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return createdStatus;
  }

  @Put('/statuses/:statusId')
  async updateStatus(
    @Param('statusId') statusId: string,
    @Body() body: UpdateStatusValidation,
  ): Promise<string> {
    const [error, status] = await this.statusService.updateStatusById(
      Number(statusId),
      body,
    );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found status
    if (!status) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return status;
  }

  @Delete('/statuses/:statusId')
  async deleteStatus(@Param('statusId') statusId: string): Promise<string> {
    const [error, status] = await this.statusService.deleteStatusById(
      Number(statusId),
    );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found Status
    if (!status) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return status;
  }
}
