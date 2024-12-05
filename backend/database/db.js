const { Client } = require('pg')
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log('USER:', process.env.DB_USER);  
console.log('HOST:', process.env.DB_HOST)
console.log('DATABASE:', process.env.DB_DATABASE);
console.log('PASSWORD:', process.env.DB_PASSWORD);


const client = new Client({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5000,
})

module.exports = { client }