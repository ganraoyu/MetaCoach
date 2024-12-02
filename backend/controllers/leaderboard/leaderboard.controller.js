const { shortRegionClient } = require('../../utils/generalUtils');
const { queues, queueMapping } = require('../../utils/queueData.js')

const getAboveMasterLeaderboards = async (endpoint, res, rank, region, mode) => {
    try {
        const queue = queueMapping[mode];
        const client = shortRegionClient(region);
        const response = await client.get(`/tft/league/v1/${endpoint}?queue=${queue}`);
        if (!region){return res.status(400).send('Please provide a region as a path parameter');}

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

        res.json({playerData});
    } catch (error) {
        console.error(`Error fetching ${rank} data:`, error.response ? error.response.data : error.message);
        res.status(500).send(`Error connecting to Riot API for ${rank}`);
    }
};

const getBelowMasterLeaderboards = async (res, region, rank, division, mode) => {
    try{
        const queue = queueMapping[mode];
        const client = shortRegionClient(region)
        const response = await client.get(`/tft/league/v1/entries/${rank.toUpperCase()}/${division.toUpperCase()}?queue=${queue}`);

        const playerData = response.data.map((entry, index) => {
            const { summonerId, wins, losses, leaguePoints } = entry; 
            
            return {
                rank: index + 1, 
                leaguePoints:leaguePoints,
                summonerId: summonerId,
                winrate: ((wins / (wins + losses)) * 100).toFixed(2) + '%',
                wins: wins, 
                losses: losses,
            };
        });
        res.json({playerData})
    } catch(error){
        console.log(error)
    }
}

const getChallengerLeaderboard = (req, res) => {
    const region = req.params.region;
    const mode = req.params.mode
    getAboveMasterLeaderboards('challenger', res, 'Challenger', region, mode);
};
const getGrandmasterLeaderboard = (req, res) => {
    const region = req.params.region;
    const mode = req.params.mode
    getAboveMasterLeaderboards('grandmaster', res, 'Grandmaster', region, mode);
}
const getMasterLeaderboard = (req, res) => {
    const region = req.params.region;
    const mode = req.params.mode
    getAboveMasterLeaderboards('master', res, 'Master', region, mode);
}

const getBelowMasterLeaderboard = (req, res) => {
    const { region, rank, division, mode } = req.params
    console.log(region, rank, division)
    getBelowMasterLeaderboards(res, region, rank, division, mode)
}

module.exports = { getChallengerLeaderboard, getGrandmasterLeaderboard, getMasterLeaderboard, getBelowMasterLeaderboard };
