/* eslint-disable @typescript-eslint/no-var-requires */
import { Address } from './Address';
const Model = require('objection');

export class User extends Model {
  static get tableName() {
    return 'user';
  }
  
  id!: number;
  addressId?: number;
  username!: string;
  name!: string;
  email!: string;
  website?: string;
  phone?: string;
  
  
  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name', 'username', 'email'],

      properties: {
        id: { type: 'integer' },
        addressId: { type: ['integer', null] },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        website: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        phone: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
      },
    };
  }
  
  // This object defines the relations to other models.
  static get relationMappings() {
    // Importing models here is one way to avoid require loops.
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'user.addressId',
          to: 'address.id',
        },
      },
    };
  }
}
