import {
  Table,
  Model,
  Column,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from './User.model';
import { Project } from './Project.model';
import { TaskUser } from './TaskUser.model';
import { TaskTag } from './TaskTag.model';
import { Tag } from './Tag.model';
import { Status } from './Status.model';

@Table({ tableName: 'tasks' })
export class Task extends Model {
  @Column
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @ForeignKey(() => Project)
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  @ForeignKey(() => Status)
  statusId: number;

  @BelongsTo(() => Status)
  status: Status;

  @BelongsToMany(() => User, () => TaskUser)
  users: User[];

  @BelongsToMany(() => Tag, () => TaskTag)
  tags: Tag[];
}
