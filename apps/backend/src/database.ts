import mysql2 from 'mysql2';

export const dbConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'remoterole',
  // password: process.env.PASSWORD,
  password: 'admin',
  database: 'userInformation',
};

export const knexConfig = {
  client: 'mysql2',
  useNullAsDefault: true,
  connection: {
    host: '127.0.0.1',
    port: 3306,
    // uri: 'localhost:3306'
    user: 'remoterole',
    password: 'admin', // for production these should be encoded with env
    database: 'usersdatabase',
  },
  pool: {
    // afterCreate: (conn, cb) => {
    //     conn?.run && conn.run('PRAGMA foreign_keys = ON', cb) // There is an issue with the new versions on this
    // },
  },
};

export const db = mysql2.createPool(dbConfig);
export const createDb = async (knex) => {
  let createDatabase = false;
  const schema = knex.schema;

  if (!(await knex.schema.hasTable('user'))) {
    createDatabase = true;
    console.log('the user table has not yet been initialized');
    schema.createTable('user', (table) => {
      table.increments('id').primary();
      table
        .integer('addressId')
        .unsigned()
        .references('id')
        .inTable('address')
        .onDelete('SET NULL')
        .index();
      table.string('username');
      table.string('name');
      table.string('email');
      table.string('website');
      table.string('phone');
    });
  }

  if (!(await knex.schema.hasTable('address'))) {
    createDatabase = true;
    console.log('the address table has not yet been initialized');
    schema.createTable('address', (table) => {
      table.increments('id').primary();
      table.string('street');
      table.string('suite');
      table.string('city');
      table.string('zipcode');
      table.string('country');
      table.string('geo_lat');
      table.string('geo_lng');
    });
  }

  if (!(await knex.schema.hasTable('todo'))) {
    createDatabase = true;
    console.log('the todo table has not yet been initialized');
    schema.createTable('todo', (table) => {
      table.increments('id').primary();
      table.integer('userId');
      table.string('title');
      table.boolean('completed');
    });
  }

  if (!(await knex.schema.hasTable('post'))) {
    createDatabase = true;
    console.log('the post table has not yet been initialized');
    schema.createTable('post', (table) => {
      table.increments('id').primary();
      table.integer('userId');
      table.string('title');
      table.string('body')
    });
  }

  if (!(await knex.schema.hasTable('comment'))) {
    createDatabase = true;
    console.log('the comment table has not yet been initialized');
    schema.createTable('comment', (table) => {
      table.increments('id').primary();
      table.integer('postId');
      table.string('email');
      table.string('name');
      table.string('body');
    })
  }

  if (createDatabase) {
    console.log('creating the database!');
    return await schema;
  }

  return await schema;
};




// Users
const users = [
  {

    "user": {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",    
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org"
    },
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo_lat": "-37.3159",
      "geo_lng": "81.1496"
    },
  },


  {
    "user": {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",    
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net"
    },
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo_lat": "-43.9509",
      "geo_lng": "-34.4618"
    },
  },


  {
    "user": {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",    
      "phone": "1-463-123-4447",
      "website": "ramiro.info"
    },
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo_lat": "-68.6102",
      "geo_lng": "-47.0653"
    },
  },


  {
    "user": {
      "id": 4,
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org",    
      "phone": "493-170-9623 x156",
      "website": "kale.biz"
    },
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo_lat": "29.4572",
      "geo_lng": "-164.2990"
    },
  },


  {
    "user": {
      "id": 5,
      "name": "Chelsey Dietrich",
      "username": "Kamren",
      "email": "Lucio_Hettinger@annie.ca",    
      "phone": "(254)954-1289",
      "website": "demarco.info"
    },
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo_lat": "-31.8129",
      "geo_lng": "62.5342"
    },
  },


  {
    "user": {
      "id": 6,
      "name": "Mrs. Dennis Schulist",
      "username": "Leopoldo_Corkery",
      "email": "Karley_Dach@jasper.info",    
      "phone": "1-477-935-8478 x6430",
      "website": "ola.org"
    },
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo_lat": "-71.4197",
      "geo_lng": "71.7478"
    },
  },


  {
    "user": {
      "id": 7,
      "name": "Kurtis Weissnat",
      "username": "Elwyn.Skiles",
      "email": "Telly.Hoeger@billy.biz",    
      "phone": "210.067.6132",
      "website": "elvis.io"
    },
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo_lat": "24.8918",
      "geo_lng": "21.8984"
    },
  },


  {
    "user": {
      "id": 8,
      "name": "Nicholas Runolfsdottir V",
      "username": "Maxime_Nienow",
      "email": "Sherwood@rosamond.me",    
      "phone": "586.493.6943 x140",
      "website": "jacynthe.com"
    },
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo_lat": "-14.3990",
      "geo_lng": "-120.7677"
    },
  },


  {
    "user": {
      "id": 9,
      "name": "Glenna Reichert",
      "username": "Delphine",
      "email": "Chaim_McDermott@dana.io",    
      "phone": "(775)976-6794 x41206",
      "website": "conrad.com"
    },
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo_lat": "24.6463",
      "geo_lng": "-168.8889"
    },
  },


  {
    "user": {
      "id": 10,
      "name": "Clementina DuBuque",
      "username": "Moriah.Stanton",
      "email": "Rey.Padberg@karina.biz",    
      "phone": "024-648-3804",
      "website": "ambrose.net"
    },
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo_lat": "-38.2386",
      "geo_lng": "57.2232"
    },
  },


];
