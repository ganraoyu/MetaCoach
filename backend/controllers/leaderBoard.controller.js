const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const RIOT_API_KEY = process.env.RIOT_API_KEY;

const getLeaderboard = async (endpoint, res, rank, region) => {
    try {
        const baseURL = `https://${region}.api.riotgames.com`;
        const response = await axios.get(`${baseURL}/tft/league/v1/${endpoint}`, {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        if (!region){
            return res.status(400).send('Please provide a region as a path parameter');
        }

        res.json({
            message: `${rank} leaderboard fetched successfully`,
            leaderboard: response.data
        });

    } catch (error) {
        console.error(`Error fetching ${rank} data:`, error.response ? error.response.data : error.message);
        res.status(500).send(`Error connecting to Riot API for ${rank}`);
    }
};

const getChallengerLeaderboard = (req, res) => {
    const region = req.params.region;
    getLeaderboard('challenger', res, 'Challenger', region);
};
const getGrandmasterLeaderboard = (req, res) => {
    const region = req.params.region;
    getLeaderboard('grandmaster', res, 'Grandmaster', region);
}
const getMasterLeaderboard = (req, res) => {
    const region = req.params.region;
    getLeaderboard('master', res, 'Master', region);
}

module.exports = { getChallengerLeaderboard, getGrandmasterLeaderboard, getMasterLeaderboard };
