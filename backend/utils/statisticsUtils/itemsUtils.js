const { shortRegionClient } = require('../generalUtils.js');
const { regions, regionMapping } = require('../regionData.js');

const fetchSummonerIds = async (rank, division) => {
    const allSummonerIds = await Promise.all(
        regions.map(async (region) => {
            let response;
            const client = shortRegionClient(region);
            
            if(rank === "master" || rank === "grandmaster" || rank === "challenger"){
                response = await client.get(`/tft/league/v1/${rank}`);            
                const players = response.data.entries.slice(0, 1);
                return players.map(player => ({ summonerId: player.summonerId, region }));
            } else {
                console.log(`Making request for rank: ${rank}, division: ${division}`);  
                response = await client.get(`/tft/league/v1/entries/${rank.toUpperCase()}/${division.toUpperCase()}?queue=RANKED_TFT&page=1`);
                const players = response.data.slice(0, 1);
                return players.map(player => ({ summonerId: player.summonerId, region }));
            }         
        })
    );
    return allSummonerIds.flat();
};

const fetchSummonerPuuids = async (summonerData) => {
    const summonerPuuids = await Promise.all(
        summonerData.map(async ({ summonerId, region }) => {
            const client = shortRegionClient(region);
            const response = await client.get(`/tft/summoner/v1/summoners/${summonerId}`);
            return { puuid: response.data.puuid, region };
        })
    );
    return summonerPuuids.flat();
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
    const matchDetailsPromises = await Promise.all( 
        matchIds.map(({ matchId, region }) => {
        const client = shortRegionClient(region);
        return client.get(`/tft/match/v1/matches/${matchId}`);
        })
    )
    return matchDetailsPromises.map(response => response.data);
};

const getItemData = async (rank, division) => {
    try{
        const summonerIds = await fetchSummonerIds(rank, division);
        const summonerPuuids = await fetchSummonerPuuids(summonerIds);
        const matchHistory = await fetchMatchHistory(summonerPuuids);
        const matchDetails = await fetchMatchDetails(matchHistory);

        return matchDetails 
    } catch(error){
        console.log(error)
    }
}

module.exports = getItemData 