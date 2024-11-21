const { fullRegionClient } = require('../../utils/generalUtils');
const { fetchPlayerPuuid, fetchPlayerMatches} = require('../../utils/playerUtils.js')
const { regionMapping } = require('../../utils/regionData');

const playerPuuid = async (req, res) => {
    const { gameName, tagLine, region } = req.params;
    try {
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
        const playerMatchDetails = await fetchPlayerMatches(gameName, tagLine, region);
        if (!playerMatchDetails.length === 0) {return res.status(404).send('Matches not found')}

        res.json({ matches: playerMatchDetails });
    } catch (error) {
        console.error('Error fetching player matches:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching player matches');
    }
};

module.exports = { playerPuuid, playerMatches };