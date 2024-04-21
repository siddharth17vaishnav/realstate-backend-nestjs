import { HttpException, Inject, Injectable } from '@nestjs/common';
import { RoleModel } from 'src/db/models/role.model';
import { CreateRoleDto } from './roles.dto';
import { ERROR_MESSAGES } from 'src/common/error-messages';

@Injectable()
export class RolesService {
  constructor(
    @Inject(RoleModel) private readonly roleModel: typeof RoleModel,
  ) {}
  async getAllRoles() {
    return await this.roleModel.query();
  }

  async getRoleBySlug(slug: string) {
    return this.roleModel.query().where({ slug }).first();
  }

  async createRole(body: CreateRoleDto) {
    const findRole = await this.getRoleBySlug(body.slug);
    if (findRole) {
      throw new HttpException(ERROR_MESSAGES.ROLE_EXISTS, 400);
    }
    return this.roleModel.query().insert(body);
  }
}
