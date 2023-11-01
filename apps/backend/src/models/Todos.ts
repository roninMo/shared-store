import { Model } from 'objection';
import { User } from './User';

export class Todo extends Model {
  static get tableName() {
    return 'todo';
  }
  
  id!: number;
  userId!: number;
  title!: string;
  completed: boolean;
  
  
  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'title'],

      properties: {
        id: { type: ['integer', 'null'] },
        userId: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        completed: { type: ['boolean', 'null'] },
      },
    };
  }
  
  // This object defines the relations to other models.
  static get relationMappings() {
    // Importing models here is one way to avoid require loops. (do not use old require syntax)
    return {
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'todo.userId',
          to: 'user.id',
        },
      },
    };
  }
}

/*

{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}

*/