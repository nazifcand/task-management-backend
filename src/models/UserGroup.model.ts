import { Column, Default, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'userGroups' })
export class UserGroup extends Model {
  @Column
  title: string;

  @Default(false)
  @Column
  showUsers: boolean;

  @Default(false)
  @Column
  createUser: boolean;

  @Default(false)
  @Column
  updateUser: boolean;

  @Default(false)
  @Column
  deleteUser: boolean;
}
