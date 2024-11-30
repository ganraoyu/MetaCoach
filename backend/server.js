const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const app = express();

const userRoutes = require('./routes/player/player.routes.js');
const leaderboardRoutes = require('./routes/leaderboard/leaderboard.routes.js');
const playerStatsRoutes = require('./routes/player/playerStatistics.routes.js');
const statisticsRoutes = require('./routes/statistics/statistics.routes.js');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;

app.use('/player', userRoutes);
app.use('/leaderboard', leaderboardRoutes);      
app.use('/player/statistics', playerStatsRoutes);   
app.use('/statistics', statisticsRoutes);                                             

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});     
