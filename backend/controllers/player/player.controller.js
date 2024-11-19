const { fullRegionClient } = require('../../utils/generalClients');

const fetchPlayerPuuid = async (gameName, tagLine, region) => {
    const client = fullRegionClient(region);
    const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    const puuid = response.data.puuid;
    if (puuid.length === 0) { return null; } 
    return puuid;
};

const fetchPlayerMatches = async (puuid) => {
    const client = fullRegionClient(region);
    const response = await client.get(`/riot/account/v1/accounts/${puuid}/matches`);
    const matchIds = response.data;
    if(matchIds.length === 0) { return null; }
    return matchIds
};

const playerPuuid = async (req, res) => {
    const { gameName, tagLine, region } = req.params;
    try {
        const playerPuuid = await fetchPlayerPuuid(gameName, tagLine, region);
        if (puuid.length === 0) throw new Error('Player not found');
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching player data');
    }
};

const playerMatches = async (req, res) => {

    const { gameName, tagLine, puuid, region } = req.body;
    try {
        const playerMatches = await fetchPlayerMatches(puuid, region);
        if (playerMatches.length === 0) throw new Error('Matches not found');
        res.json(playerMatches);
    } catch(error){

    }
}
module.exports = { playerPuuid, playerMatches };