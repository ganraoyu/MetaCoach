const { shortRegionClient } = require('../../utils/generalClients');

const getLeaderboard = async (endpoint, res, rank, region) => {
    try {

        const client = shortRegionClient(region);

        const response = await client.get(`/tft/league/v1/${endpoint}`);

        if (!region){
            return res.status(400).send('Please provide a region as a path parameter');
        }


        const playerData = Object.entries(response.data.entries).map(([index, entry]) => {
            return {
                rank: parseInt(index) + 1,
                summonerId: entry.summonerId,
                leaguePoints: entry.leaguePoints,
                winrate: ((entry.wins / (entry.wins + entry.losses))* 100).toFixed(2) + '%',
                wins: entry.wins, 
                losses: entry.losses 
            }
        });

        res.json({
            playerData
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
