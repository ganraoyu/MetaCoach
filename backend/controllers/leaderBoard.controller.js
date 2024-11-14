const fullRegionClientclient = require('../utils/axiosClients');

const getLeaderboard = async (endpoint, res, rank, region) => {
    try {

        const client = fullRegionClientclient(region);

        const response = await client.get(`/tft/league/v1/${endpoint}`);

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
