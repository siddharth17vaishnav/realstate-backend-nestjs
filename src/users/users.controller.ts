import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserModel } from 'src/db/models/user.model';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/')
  async createUser(@Body() user: UserModel) {
    return this.usersService.createUser(user);
  }
}
