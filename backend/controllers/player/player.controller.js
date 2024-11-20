const { fullRegionClient } = require('../../utils/generalUtils');
const { fetchPlayerPuuid, fetchPlayerMatches} = require('../../utils/playerUtils.js')
const { regionMapping } = require('../../utils/regionData');

const playerPuuid = async (req, res) => {
    const { gameName, tagLine, region } = req.params;
    try {
        const client = fetchPlayerPuuid(gameName, tagLine, region) 
        const playerPuuid = await fetchPlayerPuuid(gameName, tagLine, region);
        if (!playerPuuid) {return res.status(404).send('Player not found')}

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
        if (!puuid) {return res.status(404).send('Player not found')}

        const playerMatchIds = await fetchPlayerMatches(puuid, region);
        if (!playerMatches.length === 0) {return res.status(404).send('Matches not found')}

        const matchDetailsPromise = playerMatchIds.map(matchId => {
            const client = fullRegionClient(region);
            return client.get(`/tft/match/v1/matches/${matchId}`);
        });
        
        const matchDetaiResponses = await Promise.all(matchDetailsPromise)
        const playerMatchDetails = matchDetaiResponses.map(response => response.data);

        res.json({ matches: playerMatchDetails });
    } catch (error) {
        console.error('Error fetching player matches:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching player matches');
    }
};

module.exports = { playerPuuid, playerMatches };