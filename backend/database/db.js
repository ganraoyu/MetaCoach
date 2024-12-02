const { Client } = require('pg')
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log(process.env.DB_USER);  
console.log(process.env.DB_HOST)
console.log(process.env.DB_DATABASE);
console.log(process.env.DB_PASSWORD);


const client = new Client({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5000,
})

client.connect().then(()=> console.log("connected"))