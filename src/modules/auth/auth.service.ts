import { Injectable } from '@nestjs/common';
import { Organization } from 'src/models/Organization.model';
import { User } from 'src/models/User.model';
import { UserGroup } from 'src/models/UserGroup.model';

@Injectable()
export class AuthService {
  login(where: any): Promise<any> {
    return User.findOne({
      where,
      include: [
        {
          model: UserGroup,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: Organization,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          through: { attributes: [] },
        },
      ],
      attributes: {
        exclude: ['password'],
      },
    })
      .then((data) => {
        data.update({ lastLogin: new Date() });
        return [null, data];
      })
      .catch((err) => [err]);
  }

  createUser(data): Promise<any> {
    return User.create(data)
      .then((data) => [null, data])
      .catch((err) => [err]);
  }
}
