import mysql2 from 'mysql2';


export const dbConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'remoterole',
    // password: process.env.PASSWORD,
    password: 'admin',
    database: 'userInformation'
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

    if (!(await knex.schema.hasTable('todo')) ) {
        createDatabase = true;
        console.log('the todo table has not yet been initialized');
        schema.createTable('todo', (table) => {
            table.increments('id').primary();
            table.integer('userId');
            table.string('title');
            table.boolean('completed');
        });
    }

    if (createDatabase) {
        console.log('creating the database!');
        return await schema;
    }

    return;
}
