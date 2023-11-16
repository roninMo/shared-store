import { Model } from 'objection';
import { Todo } from './Todos';
import { Address } from './Address';

export class User extends Model {
  static get tableName() {
    return 'user';
  }
  
  id!: number;
  addressId?: number;
  address?: any;
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
      required: ['phone', 'name', 'username', 'email'],

      properties: {
        id: { type: ['integer', 'null'] },
        addressId: { type: ['integer', 'null'] },
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
    // Importing models here is one way to avoid require loops. (do not use old require syntax)
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'user.addressId',
          to: 'address.id',
        },
      },
      todo: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: 'user.id',
          to: 'todo.userId'
        }
      }
    };
  }
}


export interface UserValidationBase { 
  key: UserKeys, 
};

export interface UserValidationInformation extends UserValidationBase { 
  value: string 
};

export type ValidationStatus = 'valid' | 'hidden' | 'invalid';
export interface UserValidationResponse extends UserValidationInformation { 
  validation: ValidationStatus 
};

export type UserKeys = keyof User;


/* 


User class 
{
  "id": 1,
  "name": "Kieran",
  "username": "schwegmank",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org"
}



User object
{
  "id": 1,
  "name": "Kieran",
  "username": "schwegmank",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}




Response object
{
  "user/client_information": "values",
  "data": {
    "user": {
      "id": 1,
      "name": "Kieran",
      "username": "schwegmank",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
  }
}


*/