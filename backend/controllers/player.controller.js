const { fullRegionClient, shortRegionClient } = require('../utils/generalClients');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const RIOT_API_KEY = process.env.RIOT_API_KEY;

const getPlayerByGameNameAndTagLine = async (req, res) => {

    const { gameName, tagLine, region } = req.params;

    
    if (!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }
    
    try {
        const client = fullRegionClient(region);

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
        const client = fullRegionClient(region);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
        const puuid = response.data.puuid;

        if(!puuid){
            return res.status(404).json({ error: "Puuid not Found"})
        }

        const matchHistoryResponse = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);

        const matchIds = matchHistoryResponse.data;

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

const summonerInfo = async (req, res) => {
    const { gameName, tagLine, region, shortRegion } = req.params;

    try {
        const client = fullRegionClient(region);
        const shortClient = shortRegionClient(shortRegion);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
        const puuid = response.data.puuid;

        if (!puuid) {
            return res.status(404).json({ error: "Puuid not found" });
        }
 
        const summonerInfoResponse = await shortClient.get(`/lol/summoner/v4/summoners/by-puuid/${puuid}`);
        const summonerId = summonerInfoResponse.data.id;

        const summonerEntriesResponse = await shortClient.get(`/tft/league/v1/entries/by-summoner/${summonerId}`);
        const summonerEntries = summonerEntriesResponse.data;

        res.json({
            message: 'Summoner info fetched successfully',
            summonerInfo: summonerInfoResponse.data,
            summonerEntries: summonerEntries
        });
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
};

module.exports = { getPlayerByGameNameAndTagLine, getPlayerMatches, summonerInfo };