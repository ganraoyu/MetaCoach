const { shortRegionClient } = require('../generalClients.js');
const { regions, regionMapping } = require('../regionData.js');

const fetchSummonerIds = async (rank) => {
    const allSummonerIds = await Promise.all(
        regions.map(async (region) => {
            const client = shortRegionClient(region);
            const response = await client.get(`/tft/league/v1/${rank}`);
            const players = response.data.entries.slice(0, 1);
            return players.map(player => ({ summonerId: player.summonerId, region }));
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
    );
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

const getTraitData = async (rank) => {
    try {
        const summonerIds = await fetchSummonerIds(rank);
        const summonerPuuids = await fetchSummonerPuuids(summonerIds);
        const matchHistory = await fetchMatchHistory(summonerPuuids);
        const matchDetails = await fetchMatchDetails(matchHistory);

        return matchDetails;
    } catch (error) {
        console.error(error);
    }
};

module.exports = getTraitData;