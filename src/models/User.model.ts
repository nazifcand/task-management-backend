import { NOW } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserGroup } from './UserGroup.model';
import { Organization } from './Organization.model';
import { Task } from './Task.model';
import { OrganizationUser } from './OrganizationUser.model';
import { TaskUser } from './TaskUser.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @Unique
  @Column
  username: string;

  @Unique
  @Column
  email: string;

  @Default('')
  @Column
  password: string;

  @Unique
  @Column
  phone: string;

  @Default('')
  @Column
  name: string;

  @Default('')
  @Column
  surname: string;

  @Default('/default-avatar.svg')
  @Column
  avatar: string;

  @Default(NOW)
  @Column
  lastLogin: Date;

  @ForeignKey(() => UserGroup)
  @Column
  userGroupId: number;

  @BelongsTo(() => UserGroup)
  userGroup: UserGroup;

  @BelongsToMany(() => Organization, () => OrganizationUser)
  organizations: Organization[];

  @BelongsToMany(() => Task, () => TaskUser)
  tasks: Task[];
}
