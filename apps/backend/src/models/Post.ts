import { Model } from 'objection';
import { Comment } from './Comment';
import { User } from './User';

export class Post extends Model {
  static get tableName() {
    return 'post';
  }
  
  id!: number;
  userId!: number;
  title!: string;
  body!: string;
  
  
  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'title', 'body'],

      properties: {
        id: { type: ['integer', 'null'] },
        userId: { type: 'nteger' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
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
        modelClass: User,
        join: {
          from: 'post.userId',
          to: 'user.id',
        },
      },
      comment: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'post.id',
          to: 'comment:postId'
        }
      }
    };
  }
}
