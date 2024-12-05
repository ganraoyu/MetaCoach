const { client } = require('.././db'); // Import the client from db.js

async function addUser(username) {
  try {

    await client.connect();

    const query = 'INSERT INTO users (username) VALUES ($1)';
    const values = [username];

    const res = await client.query(query, values);
    console.log('User added:', res.rowCount); 
  } catch (err) {
    console.error('Error adding user:', err);
  } finally {
    await client.end(); 
  }
}


addUser('new_username'); 
