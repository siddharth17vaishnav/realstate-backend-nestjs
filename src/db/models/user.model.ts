import { BaseModel } from './base.model';
import { RoleModel } from './role.model';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}

export class UserModel extends BaseModel {
  static readonly tableName = 'users';
  static readonly idColumn = 'id';

  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  roleId: number;

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        password: { type: ['string', 'null'] },
        phoneNumber: { type: 'string' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        role: { type: 'integer' },
      },
    };
  }
  static relationMappings() {
    return {
      role: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: RoleModel,
        join: {
          from: `${UserModel.tableName}.role_id`,
          to: `${RoleModel.tableName}.${RoleModel.idColumn}`,
        },
        filter: (query) => query.select('id', 'slug', 'name'),
      },
    };
  }
}
