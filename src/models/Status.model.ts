import {
  BelongsTo,
  Model,
  Column,
  ForeignKey,
  Table,
  Default,
} from 'sequelize-typescript';
import { Project } from './Project.model';

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
}
