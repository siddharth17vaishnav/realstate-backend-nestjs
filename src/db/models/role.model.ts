import { UserModel } from 'src/db/models/user.model';
import { BaseModel } from './base.model';

export class RoleModel extends BaseModel {
  static readonly tableName = 'role';
  static readonly idColumn = 'id';

  id: number;
  name: string;
  slug: string;
  users: UserModel[];
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    return {
      users: {
        relation: BaseModel.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: `${RoleModel.tableName}.${RoleModel.idColumn}`,
          to: `${UserModel.tableName}.role_id`,
        },
      },
    };
  }
}
