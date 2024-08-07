import {
  Table,
  Model,
  Column,
  Unique,
  BelongsToMany,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { User } from './User.model';
import { Project } from './Project.model';
import { OrganizationUser } from './OrganizationUser.model';

@Table({ tableName: 'organizations' })
export class Organization extends Model {
  @Column
  title: string;

  @Unique
  @Column
  slug: string;

  @Column
  description: string;

  @Default('default-thumbnail.svg')
  @Column
  thumbnail: string;

  @HasMany(() => Project)
  projects: Project[];

  @BelongsToMany(() => User, () => OrganizationUser)
  users: User[];
}
