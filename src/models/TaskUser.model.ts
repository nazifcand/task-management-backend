import { Column, ForeignKey, Table, Model } from 'sequelize-typescript';
import { User } from './User.model';
import { Task } from './Task.model';

@Table({ tableName: 'taskUser', timestamps: false })
export class TaskUser extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Task)
  @Column
  taskId: number;
}
