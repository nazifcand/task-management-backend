import { Injectable } from '@nestjs/common';
import { User } from 'src/models/User.model';

@Injectable()
export class AppService {
  async getAllUsers(): Promise<User[]> {
    return await User.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
    });
  }
}
