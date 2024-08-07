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
import { Tag } from 'src/models/Tag.model';
import { TagService } from './tag.service';
import {
  CreateTagValidation,
  UpdateTagValidation,
} from 'src/validators/tag.validation';

@Controller()
export default class TagController {
  constructor(private tagService: TagService) {}

  @Get('/tags')
  async getTags(): Promise<Tag[]> {
    const tags = await this.tagService.getTags();
    return tags;
  }

  @Get('/tags/:tagId')
  async getTagById(@Param('tagId') tagId: string): Promise<string> {
    const [error, tag] = await this.tagService.getTagById(Number(tagId));

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found tag
    if (!tag) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return tag;
  }

  @Post('/tags')
  async createTag(@Body() body: CreateTagValidation): Promise<Tag> {
    const [error, createdTag] = await this.tagService.createTag(body);

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return createdTag;
  }

  @Put('/tags/:tagId')
  async updateTag(
    @Param('tagId') tagId: string,
    @Body() body: UpdateTagValidation,
  ): Promise<string> {
    const [error, tag] = await this.tagService.updateTagById(
      Number(tagId),
      body,
    );

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found tag
    if (!tag) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return tag;
  }

  @Delete('/tags/:tagId')
  async deleteTag(@Param('tagId') tagId: string): Promise<string> {
    const [error, tag] = await this.tagService.deleteTagById(Number(tagId));

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found tag
    if (!tag) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return tag;
  }
}
