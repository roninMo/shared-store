import mysql2 from 'mysql2';


export const dbConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'remoteAdmin',
    // password: process.env.PASSWORD,
    password: 'admin',
    database: 'userInformation'
};


export const db = mysql2.createPool(dbConfig);
