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

  @HasMany(() => Task)
  tasks: Task[];

  @HasMany(() => Status)
  statuses: Status[];
}
