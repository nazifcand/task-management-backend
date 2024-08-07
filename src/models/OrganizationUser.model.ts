import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { User } from './User.model';
import { Organization } from './Organization.model';

@Table({ tableName: 'organizationUser', timestamps: false })
export class OrganizationUser extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Organization)
  @Column
  organizationId: number;
}
