import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/db/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async createUser(user: Partial<UserModel>) {
    return await this.userModel.query().insert(user);
  }
}
