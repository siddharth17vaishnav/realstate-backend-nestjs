import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserModel } from 'src/db/models/user.model';

@Module({
  imports: [ObjectionModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
