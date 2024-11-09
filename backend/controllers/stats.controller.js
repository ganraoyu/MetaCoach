const axiosClient = require('../utils/axiosClient');

const playerWinRate = async (req, res) => {

    const { gameName, tagLine, region } = req.params;

    if(!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }

    try{
        const client = axiosClient(region);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
        const puuid = response.data.puuid;

        if(!puuid){
            return res.status(404).send('Puuid not found');
        }
        const matchHistoryResponse = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);

        const matchIds = matchHistoryResponse.data.slice(0,9);

        const matchDetailsPromises = matchIds.map(matchId =>
            client.get(`/tft/match/v1/matches/${matchId}`)
        );

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);

        
        const playerWinResults = matchDetails.map(matches =>{

            const participant = matches.info.participants.find(
                participant => participant.puuid === puuid
            );

            if(participant){
                return participant.win === true;
            } else {
                return false;
            }
        })
            
        const totalWins = playerWinResults.filter(result => result === true).length;
        const totalGames = playerWinResults.length;
        const winRate = totalWins / totalGames * 100;

        res.json({
            winRate: winRate,
            totalWins: totalWins,
        });  

        /* only for recent 20 matches */ 

    } catch(error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}

const playerMostPlayedTraits = async (req, res) => {

    const { gameName, tagLine,region } = req.params;

    try{
        
        const client = axiosClient(region);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);

        const puuid = response.data.puuid;

        const matchHistoryResponse = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);

        const matchIds = matchHistoryResponse.data;
        const matchDetailsPromises = matchIds.map(matchId =>
            client.get(`/tft/match/v1/matches/${matchId}`)
        );

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);



    } catch(error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}
module.exports = { playerWinRate, playerMostPlayedTraits };