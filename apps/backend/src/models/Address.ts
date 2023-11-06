import { Model } from 'objection';
import { User } from './User';

export class Address extends Model {
  static get tableName() {
    return 'address';
  }
  
  id!: number;
  street!: string;
  suite!: string;
  city!: string;
  zipcode!: string;
  country?: string;
  geo_lat?: string;
  geo_lng?: string;
  
  
  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['street', 'suite', 'city', 'zipcode'],

      properties: {
        id: { type: 'integer' },
        street: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        suite: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        city: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        zipcode: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        country: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        geo_lat: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        geo_lng: { type: ['string', 'null'], minLength: 1, maxLength: 255 }
      },
    };
  }
  
  // This object defines the relations to other models.
  static get relationMappings() {
    // Importing models here is one way to avoid require loops. (do not use old require syntax)
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'address.id',
          to: 'user.addressId'
        }
      },
    };
  }
};

/*

{
  "id": 1,
  "street": "Kulas Light",
  "suite": "Apt. 556",
  "city": "Gwenborough",
  "zipcode": "92998-3874",
  "country": "United Stats",
  "geo_lat": "-37.3159",
  "geo_lng": "81.1496"
}

*/