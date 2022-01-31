require('dotenv').config();
const mysql = require('mysql2');

const SQLUsername = process.env.DB_USERNAME;
const SQLpassword = process.env.DB_PASSWORD;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: SQLUsername,
        password: SQLpassword,
        database: 'employees_db'
    },
    console.log('connected to employees_db')
);

module.exports = db;