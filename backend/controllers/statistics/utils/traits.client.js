const { shortRegionClient } = require('../../../utils/generalClients.js');
const { regions, regionMapping } = require('../../../utils/regionData.js');

const getTraitData = async (rank) => {
    try {
        const allSummonerIds = await Promise.all(
            regions.map(async (region) => {
                const client = shortRegionClient(region);
                const response = await client.get(`/tft/league/v1/${rank}`);
                const players = response.data.entries.slice(0, 1);
                return players.map(player => ({ summonerId: player.summonerId, region }));
            })
        );

        const summonerData = allSummonerIds.flat();

        const summonerPuuid = await Promise.all(
            summonerData.map(async ({ summonerId, region }) => {
                const client= shortRegionClient(region);
                const response = await client.get(`/tft/summoner/v1/summoners/${summonerId}`);
                const puuid = response.data.puuid;
                return { puuid: puuid, summonerId, region };
            })
        )

        const puuids = summonerPuuid.flat();

        const puuidMatchHistory = await Promise.all(
            puuids.map(async ({ puuid, region }) => {
                const matchRegion = regionMapping[region];
                const client = shortRegionClient(matchRegion);
                const response = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
                return response.data.slice(0, 1).map(matchId => ({ matchId, region: matchRegion }));
            })
        );

        const matchIds = puuidMatchHistory.flat();

        const matchIdsByRegion = matchIds.reduce((acc, { matchId, region }) => {
            if (!acc[region]) {
                acc[region] = [];
            }
            acc[region].push(matchId);
            return acc;
        }, {});

        const matchDetailsPromises = Object.entries(matchIdsByRegion).flatMap(([region, matchIds]) => {
            const client = shortRegionClient(region);
            return matchIds.map(matchId => client.get(`/tft/match/v1/matches/${matchId}`));
        });

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);

        return matchDetailsResponses.map(response => response.data)
    } catch (error) {
        console.error(`Error fetching ${rank} players:`, error.message);
        throw new Error(`Error fetching ${rank} players: ${error.message}`);
    }
};

module.exports = getTraitData;