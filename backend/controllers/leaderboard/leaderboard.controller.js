const { shortRegionClient } = require('../../utils/generalUtils');

const ranksBelowMaster = ["DIAMOND", "EMERALD", "PLATINUM", "GOLD", "SILVER", "BRONZE"]

const getAboveMasterLeaderboards = async (endpoint, res, rank, region) => {
    try {
        const client = shortRegionClient(region);
        const response = await client.get(`/tft/league/v1/${endpoint}`);
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

const getBelowMasterLeaderboards = async (res, region, rank, division) => {
    try{
        const client = shortRegionClient(region)
        const response = await client.get(`/tft/league/v1/entries/${rank.toUpperCase()}/${division.toUpperCase()}?queue=RANKED_TFT&page=1`);

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
    getAboveMasterLeaderboards('challenger', res, 'Challenger', region);
};
const getGrandmasterLeaderboard = (req, res) => {
    const region = req.params.region;
    getAboveMasterLeaderboards('grandmaster', res, 'Grandmaster', region);
}
const getMasterLeaderboard = (req, res) => {
    const region = req.params.region;
    getAboveMasterLeaderboards('master', res, 'Master', region);
}

const getBelowMasterLeaderboard = (req, res) => {
    const { region, rank, division } = req.params
    console.log(region, rank, division)
    getBelowMasterLeaderboards(res, region, rank, division)
}

module.exports = { getChallengerLeaderboard, getGrandmasterLeaderboard, getMasterLeaderboard, getBelowMasterLeaderboard };
