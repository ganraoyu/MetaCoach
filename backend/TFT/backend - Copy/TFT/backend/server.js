const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const app = express();
const userRoutes = require('./routes/player.routes.js');
const leaderboardRoutes = require('./routes/leaderboard.routes.js');
const statsRoutes = require('./routes/stats.routes.js');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;
const RIOT_API_KEY = process.env.RIOT_API_KEY;

console.log('RIOT_API_KEY:', RIOT_API_KEY); 

app.get('/', (req, res) => {
    res.send('Welcome to the Riot API server!');
});


app.use('/player', userRoutes);
app.use('/leaderboard', leaderboardRoutes);      
app.use('/stats', statsRoutes);                                                

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});     
