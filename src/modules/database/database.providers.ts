import { Sequelize } from 'sequelize-typescript';
import { Organization } from 'src/models/Organization.model';
import { OrganizationUser } from 'src/models/OrganizationUser.model';
import { Project } from 'src/models/Project.model';
import { Status } from 'src/models/Status.model';
import { Tag } from 'src/models/Tag.model';
import { Task } from 'src/models/Task.model';
import { TaskTag } from 'src/models/TaskTag.model';
import { TaskUser } from 'src/models/TaskUser.model';
import { User } from 'src/models/User.model';
import { UserGroup } from 'src/models/UserGroup.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } = process.env;

      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: DB_HOST,
        port: 5432,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
      });
      sequelize.addModels([
        User,
        UserGroup,
        Organization,
        Project,
        OrganizationUser,
        Task,
        TaskUser,
        Tag,
        TaskTag,
        Status,
      ]);
      await sequelize.sync({ alter: true, logging: false });
      return sequelize;
    },
  },
];
