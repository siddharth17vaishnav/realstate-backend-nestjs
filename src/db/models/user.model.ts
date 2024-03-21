import { Model } from 'objection';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class UserModel extends Model {
  static readonly tableName = 'users';
  static readonly idColumn = 'id';

  id: number;
  email: string;
  password?: string;
  phoneNumber?: string;
  firstName: string;
  lastName?: string;
  role: UserRole;

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['email', 'firstName', 'lastName', 'role', 'password'],
      properties: {
        password: { type: ['string', 'null'] },
        phoneNumber: { type: 'string' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        role: { type: 'string' },
      },
    };
  }
}
