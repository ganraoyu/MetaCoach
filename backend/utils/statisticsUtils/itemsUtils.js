const { shortRegionClient } = require('../generalUtils.js');
const { regions, regionMapping } = require('../regionData.js');

const fetchSummonerIds = async (rank) => {
    const allSummonerId = await Promise.all(
        regions.map(async (region) => {
            const client = shortRegionClient(region)
            const response = await client.get(`/tft/league/v1/${rank}`);
            const players = response.data.slice(0,1)
            return players.map(player => {Summoner: player.summonerId, region})
        })
    )
    return allSummonerId.flat();
}

const fetchSummonerPuuids = async (summonerData) => {
    const summonerPuuids = await Promise.all(
        summonerData.map(async ({ summonerId, region }) => {
            const client = shortRegionClient(region)
            const response = await client.get(`/tft/summoner/v1/summoners/${summonerId}`);
            return { puuid: response.data.puuid, region }
        })
    )
    return summonerPuuids.flat();
}

const fetchMatchHistory = async (puuids) => {
    const puuidMatchHistory = await Promise.all(
        puuids.map(async ({ puuid, region}) => {
            const matchRegion = regionMapping[region]
            const client = shortRegionClient(matchRegion);
            const response = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
            return response.data.slice(0.1).map(matchId => ({ matchId, matchRegion }))
        })
    )
}