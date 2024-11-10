const axiosClient = require('../utils/axiosClient');

const getPlayerByGameNameAndTagLine = async (req, res) => {

    const { gameName, tagLine, region } = req.params;

    
    if (!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }
    
    try {
        const client = axiosClient(region);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
        const puuid = response.data.puuid

        if (!puuid) {
            return res.status(404).json({ error: "Puuid not found" });
        }
        
        res.json({
            Playerdata: response.data
        });
        
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
        console.log(RIOT_API_KEY)
    }
};

const getPlayerMatches = async (req, res) => {
    const { gameName, tagLine, region } = req.params;

    if (!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }

    try {
        const client = axiosClient(region);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
        const puuid = response.data.puuid;

        if(!puuid){
            return res.status(404).json({ error: "Puuid not Found"})
        }

        const matchHistoryResponse = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);

        const matchIds = matchHistoryResponse.data.slice(0,9);

        if (!matchIds || matchIds.length === 0) {
            return res.status(404).json({ error: 'No matches found for this player' });
        }

        const matchDetailsPromises = matchIds.map(matchId =>
            client.get(`/tft/match/v1/matches/${matchId}`)
        );

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);

        res.json({
            message: 'Match history fetched successfully',
            matchDetails: matchDetails
        });

    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
};

module.exports = { getPlayerByGameNameAndTagLine, getPlayerMatches }; 