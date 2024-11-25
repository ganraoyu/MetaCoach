const { shortRegionClient } = require('../generalUtils.js');
const { regions, regionMapping } = require('../regionData.js');

const fetchSummonerIds = async (rank, division) => {
    const allSummonerIds = await Promise.all(
        regions.map(async (region) => {
            const client = shortRegionClient(region);
            let response;

            if(rank === "master" || rank === "grandmaster" || rank === "challenger"){
                response = await client.get(`/tft/league/v1/${rank}`);
                const players = response.data.entries.slice(0, 1);
                return players.map(player => ({ summonerId: player.summonerId, region }));
            } else {
                response = await client.get(`/tft/league/v1/entries/${rank.toUpperCase()}/${division.toUpperCase()}?queue=RANKED_TFT&page=1`);
                const players = response.data.slice(0, 1);
                return players.map(player => ({ summonerId: player.summonerId, region }));
            }
        })
    );
    return allSummonerIds.flat();
};

const fetchSummonerPuuids = async (summonerData) => {
    const summonerPuuid = await Promise.all(
        summonerData.map(async ({ summonerId, region }) => {
            const client = shortRegionClient(region);
            const response = await client.get(`/tft/summoner/v1/summoners/${summonerId}`);
            return { puuid: response.data.puuid, region };
        })
    );[]
    return summonerPuuid.flat();
};

const fetchMatchHistory = async (puuids) => {
    const puuidMatchHistory = await Promise.all(
        puuids.map(async ({ puuid, region }) => {
            const matchRegion = regionMapping[region];
            const client = shortRegionClient(matchRegion);
            const response = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
            return response.data.slice(0, 1).map(matchId => ({ matchId, region: matchRegion }));
        })
    );
    return puuidMatchHistory.flat();
};

const fetchMatchDetails = async (matchIds) => {
    const matchDetailsPromises = matchIds.map(({ matchId, region }) => {
        const client = shortRegionClient(region);
        return client.get(`/tft/match/v1/matches/${matchId}`);
    });
    const matchDetailsResponses = await Promise.all(matchDetailsPromises);
    return matchDetailsResponses.map(response => response.data);
};

const processPlayerData = async (matchDetails) => {
    const playerData = matchDetails.flatMap(response => 
        response.info.participants.map(participant => ({
            traits: participant.traits.map(trait => ({
                traitName: trait.name,
            }))
        }))
    );
    return playerData;
};

const calculateTraitData = async (playerData) => {
    const traitData = playerData.reduce((acc, player) => {
        player.traits.forEach(trait => {
            if (acc[trait.traitName]) {
                acc[trait.traitName] += 1; 
            } else {
                acc[trait.traitName] = 1; 
            }
        });
        return acc;
    }, {}); 

    const sortedTraitData = Object.entries(traitData)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count); 

    return sortedTraitData;
};


const getTraitData = async (rank, division) => {
    try {
        const summonerIds = await fetchSummonerIds(rank, division);
        const summonerPuuids = await fetchSummonerPuuids(summonerIds);
        const matchHistory = await fetchMatchHistory(summonerPuuids);
        const matchDetails = await fetchMatchDetails(matchHistory);
        const playerData = await    processPlayerData(matchDetails)
        const traitData = await calculateTraitData(playerData)

        return traitData;
    } catch (error) {
        console.error(error);   
    }
};  

module.exports =  getTraitData;