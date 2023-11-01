import mysql2 from 'mysql2';


export const dbConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'remoteAdmin',
    // password: process.env.PASSWORD,
    password: 'admin',
    database: 'userInformation'
};


export const knexConfig = {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
        filename: 'exmaple.db'
    },
    pool: {
        afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
        },
    },
};


export const db = mysql2.createPool(dbConfig);
export const createDb = async (knex) => {
    // If tables are already created, return
    if (await knex.schema.hasTable('user') ||
        await knex.schema.hasTable('address')
    ) {
        return;
    }

    // Create the tables, here's the syntax (go, do a crime): 
    return knex.schema
    .createTable('user', (table) => {
        table.increments('id').primary()
        table
            .integer('addressId')
            .unsigned()
            .references('id')
            .inTable('address')
            .onDelete('SET NULL')
            .index()
        table.string('username')
        table.string('name')
        table.string('email')
        table.string('website')
        table.string('phone')
    })
    .createTable('address', (table) => {
        table.increments('id').primary()
        table.string('street')
        table.string('suite')
        table.string('city')
        table.string('zipcode')
        table.string('country')
        table.string('geo_lat')
        table.string('geo_lng')
    });
}
