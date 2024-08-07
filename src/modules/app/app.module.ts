import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import AuthModule from '../auth/auth.module';
import { OrganizationModule } from '../organization/organization.module';
import { ProjectModule } from '../project/project.module';
import { TaskModule } from '../task/task.module';
import { TagModule } from '../tag/tag.module';
import { StatusModule } from '../status/status.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    OrganizationModule,
    ProjectModule,
    TaskModule,
    TagModule,
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
