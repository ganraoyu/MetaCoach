const fullRegionClient = require('../utils/axiosClients');

const getPlayerWinRate = async (req, res) => {

    const { gameName, tagLine, region } = req.params;

    if(!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }

    try{
        const client = fullRegionClient(region);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
            const puuid = response.data.puuid;

        if(!puuid){
            return res.status(404).send('Puuid not found');
        }

        const matchHistoryResponse = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);

        const matchIds = matchHistoryResponse.data.slice(0,10);

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

const getPlayerMostPlayedTraits = async (req, res) => {
    const { gameName, tagLine, region } = req.params;

    if (!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }

    try {
        const client = fullRegionClient(region);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
        const puuid = response.data.puuid;

        if (!puuid) {
            return res.status(404).send('Puuid not found');
        }

        const matchHistoryResponse = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
        const matchIds = matchHistoryResponse.data.slice(0, 2); 

        const matchDetailsPromises = matchIds.map(matchId =>
            client.get(`/tft/match/v1/matches/${matchId}`)
        );

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);

        const traitCounts = {};

        matchDetails.forEach(matches => {
            const participant = matches.info.participants.find(
                participant => participant.puuid === puuid
            );

            if (participant && participant.traits) {
                participant.traits.forEach(trait => {
                    const traitName = trait.name;
                    const numUnits = trait.num_units;

                    if (traitCounts[traitName]) {   
                        traitCounts[traitName] += numUnits;
                    } else {
                        traitCounts[traitName] = numUnits;
                    }
                });
            }
        });

        const topThreeTraits = Object.entries(traitCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([trait, num_units]) => ({ trait, num_units }));

        res.json({
            mostPlayedTraits: topThreeTraits,
        });

    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
};

const getPlayerMostPlayedAugments = async (req, res) =>{
    const { gameName, tagLine, region } = req.params

    try{

        const client = fullRegionClient(region);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
        const puuid = response.data.puuid;

        if (!puuid) {
            return res.status(404).send('Puuid not found');
        }

        const matchHistoryResponse = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
        const matchIds = matchHistoryResponse.data.slice(0, 20); 

        const matchDetailsPromises = matchIds.map(matchId =>
            client.get(`/tft/match/v1/matches/${matchId}`)
        );

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);

        const augments = {};

        matchDetails.forEach(matches => {
            const participant = matches.info.participants.find(
                participant => participant.puuid === puuid
            );
            if(participant && participant.augments){
                participant.augments.forEach(augment => {
                    if(augments[augment]){
                        augments[augment] += 1;
                    } else {
                        augments[augment] = 1;
                    }
                });
            }
        })

        const topThreeAugments = Object.entries(augments)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([augment, num_games]) => ({ augment, num_games }));

        res.json({
            mostPlayedAugments: topThreeAugments,
        });
    } catch (error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}


module.exports = { getPlayerWinRate, getPlayerMostPlayedTraits, getPlayerMostPlayedAugments };