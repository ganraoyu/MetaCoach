const { client } = require('.././db'); 

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) NOT NULL
  );
`;

async function createTable() {
  try {
    await client.connect();
    console.log('Connected to the database');
    await client.query(createTableQuery); 
    console.log('Table "users" created or already exists.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await client.end(); 
  }
}

createTable(); 