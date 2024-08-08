import {
  BelongsTo,
  Model,
  Column,
  ForeignKey,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Project } from './Project.model';
import { TaskTag } from './TaskTag.model';
import { Task } from './Task.model';
import { User } from './User.model';

@Table({ tableName: 'tags' })
export class Tag extends Model {
  @Column
  title: string;

  @Column
  color: string;

  @ForeignKey(() => Project)
  projectId: number;

  @BelongsTo(() => Project, { onDelete: 'CASCADE' })
  project: Project;

  @BelongsToMany(() => Task, () => TaskTag)
  tasks: Task[];

  @ForeignKey(() => User)
  @Column
  createdUserId: number;

  @BelongsTo(() => User, { onDelete: 'SET NULL' })
  createdUser: User;
}
