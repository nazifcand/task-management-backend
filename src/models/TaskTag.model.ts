import { Column, ForeignKey, Table, Model } from 'sequelize-typescript';
import { Tag } from './Tag.model';
import { Task } from './Task.model';

@Table({ tableName: 'taskTag', timestamps: false })
export class TaskTag extends Model {
  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @ForeignKey(() => Task)
  @Column
  taskId: number;
}
