import {
  BelongsTo,
  Model,
  Column,
  ForeignKey,
  Table,
  Default,
} from 'sequelize-typescript';
import { Project } from './Project.model';
import { User } from './User.model';

@Table({ tableName: 'statuses' })
export class Status extends Model {
  @Column
  title: string;

  @Column
  color: string;

  @Column
  priority: number;

  @Default(false)
  @Column
  default: boolean;

  @ForeignKey(() => Project)
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  @ForeignKey(() => User)
  @Column
  createdUserId: number;

  @BelongsTo(() => User, { onDelete: 'SET NULL' })
  createdUser: User;
}
