import { Model } from 'objection';
import { Post } from './Post';

export class Comment extends Model {
  static get tableName(): string {
    return 'comment';
  }
  
  id!: number;
  postId!: number;
  email!: string;
  name!: string;
  body!: string;
  
  
  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['postId', 'email', 'name', 'body'],

      properties: {
        id: { type: ['integer', 'null'] },
        postId: { type: 'integer', },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        body: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
  
  // This object defines the relations to other models.
  static get relationMappings() {
    // Importing models here is one way to avoid require loops. (do not use old require syntax)
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'commst.postId',
          to: 'post.id',
        },
      },
    };
  }
  
}
