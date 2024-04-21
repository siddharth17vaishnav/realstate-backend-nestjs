import { Model, snakeCaseMappers } from 'objection';

export class BaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers(); // Use snake_case column names
  }
}
