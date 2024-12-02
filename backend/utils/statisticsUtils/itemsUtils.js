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

const processPlayerData = (matchDetails) => {
    const playerData = matchDetails.flatMap(response => 
        response.info.participants.map(participant => ({
            placement: participant.placement,
            items: participant.units
            .filter(unit => unit.itemNames && unit.itemNames.length > 0) 
            .map(unit => ({items: unit.itemNames}))
        }))
    );
    return playerData;
};

const calculateItemData = (playerData) => {
    const itemData = playerData.reduce((acc, player) => {
        player.items.forEach(itemGroup => { 
            itemGroup.items.forEach(itemName => { 
                if (acc[itemName]) {
                    acc[itemName].totalGames += 1;
                    acc[itemName].placements.push(player.placement);
                    if (player.placement === 1) {
                        acc[itemName].wins += 1;
                    }
                } else {
                    acc[itemName] = {
                        totalGames: 1,
                        placements: [player.placement],
                        wins: player.placement === 1 ? 1 : 0
                    };
                }
            });
        });
        return acc;
    }, {});
    return itemData;
};

const calculateItemRanking = (itemData) => {
    const itemRanking = Object.entries(itemData).map(([itemId, { totalGames, wins, placements }]) => ({
        itemId,
        winrate: ((wins / totalGames) * 100).toFixed(2),
        placement: (placements.reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2),
        totalGames
    }));
    return itemRanking.sort((a, b) => a.placement - b.placement);
};


const getItemData = async (rank, division) => {
    try{
        const summonerIds = await fetchSummonerIds(rank, division);
        const summonerPuuids = await fetchSummonerPuuids(summonerIds);
        const matchHistory = await fetchMatchHistory(summonerPuuids);
        const matchDetails = await fetchMatchDetails(matchHistory);

        const playerData = processPlayerData(matchDetails)
        const itemData = calculateItemData(playerData)
        const itemRankings = calculateItemRanking(itemData)

        return itemRankings
    } catch(error){
        console.log(error)
    }
}

module.exports = getItemData 