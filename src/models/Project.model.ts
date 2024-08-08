import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { Organization } from './Organization.model';
import { Task } from './Task.model';
import { Status } from './Status.model';
import { User } from './User.model';

@Table({ tableName: 'projects' })
export class Project extends Model {
  @Column
  title: string;

  @Column
  slug: string;

  @Column
  description: string;

  @Default('default-thumbnail.svg')
  @Column
  thumbnail: string;

  @ForeignKey(() => Organization)
  @Column
  organizationId: number;

  @BelongsTo(() => Organization)
  organization: Organization;

  @HasMany(() => Task, { onDelete: 'CASCADE' })
  tasks: Task[];

  @HasMany(() => Status, { onDelete: 'CASCADE' })
  statuses: Status[];

  @ForeignKey(() => User)
  @Column
  createdUserId: number;

  @BelongsTo(() => User, { onDelete: 'SET NULL' })
  createdUser: User;
}
