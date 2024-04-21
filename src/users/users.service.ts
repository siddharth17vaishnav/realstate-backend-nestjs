import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ERROR_MESSAGES } from 'src/common/error-messages';
import { UserModel } from 'src/db/models/user.model';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'src/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserModel) private readonly userModel: typeof UserModel,
    private jwtService: JwtService,
  ) {}

  generateToken(payload: JwtPayload, expiryInDays?: number) {
    return this.jwtService.sign(payload, {
      expiresIn: `${expiryInDays || 7} days`,
    });
  }

  async createUser(user: Partial<UserModel>) {
    const findUser = await this.getUserByEmail(user.email);
    if (findUser) {
      throw new HttpException(ERROR_MESSAGES.USER_EXISTS, 400);
    }
    const body = {
      ...user,
      password: await bcrypt.hashSync(user.password, 10),
    };
    const createUser = await this.userModel.query().insert(body);
    return {
      ...createUser,
      accessToken: this.generateToken({
        id: createUser.id,
        email: createUser.email,
      }),
    };
  }

  async getUserByEmail(email: string) {
    return await this.userModel.query().where('email', email).first();
  }
}
