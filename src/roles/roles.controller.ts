import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './roles.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/db/models/user.model';

@ApiTags('roles')
@Controller({ path: 'roles', version: '1' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('/')
  async getRoles() {
    return this.rolesService.getAllRoles();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Post('/create')
  async createRole(@Body() body: CreateRoleDto) {
    return this.rolesService.createRole(body);
  }
}
