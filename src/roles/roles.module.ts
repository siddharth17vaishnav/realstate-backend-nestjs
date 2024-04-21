import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { RoleModel } from 'src/db/models/role.model';

@Module({
  imports: [ObjectionModule.forFeature([RoleModel])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
