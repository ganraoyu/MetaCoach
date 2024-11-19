const { fullRegionClient } = require('../../utils/generalClients');
const { regionMapping } = require('../../utils/regionData');

const fetchPlayerPuuid = async (gameName, tagLine, region) => {
    const client = fullRegionClient(region);
    const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    const puuid = response.data.puuid;
    if (!puuid) { return null; }
    return puuid;
};

const fetchPlayerMatches = async (puuid, region) => {
    const client = fullRegionClient(region);
    const response = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
    const matchIds = response.data;
    if (!matchIds || matchIds.length === 0) { return null; }
    return matchIds;
};

const playerPuuid = async (req, res) => {
    const { gameName, tagLine, region } = req.params;
    try {
        const playerPuuid = await fetchPlayerPuuid(gameName, tagLine, region);
        if (!playerPuuid) {
            return res.status(404).send('Player not found');
        }
        res.json({ puuid: playerPuuid });
    } catch (error) {
        console.error('Error fetching player PUUID:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching player PUUID');
    }
};

const playerMatches = async (req, res) => {
    const { gameName, tagLine, region } = req.params;
    try {
        const puuid = await fetchPlayerPuuid(gameName, tagLine, region);
        if (!puuid) {
            return res.status(404).send('Player not found');
        }
        const playerMatches = await fetchPlayerMatches(puuid, region);
        if (!playerMatches) {
            return res.status(404).send('Matches not found');
        }
        res.json({ matches: playerMatches });
    } catch (error) {
        console.error('Error fetching player matches:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching player matches');
    }
};

module.exports = { playerPuuid, playerMatches };