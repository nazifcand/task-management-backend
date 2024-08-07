import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import AuthModule from '../auth/auth.module';
import { OrganizationModule } from '../organization/organization.module';
import { ProjectModule } from '../project/project.module';
import { TaskModule } from '../task/task.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    OrganizationModule,
    ProjectModule,
    TaskModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
