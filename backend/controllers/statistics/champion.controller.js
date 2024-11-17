const { shortRegionClient } = require('../../utils/generalClients');

const getChallengerPlayers = async (req, res) => {
    const regions = ['BR1', 'EUN1', 'EUW1', 'JP1', 'KR', 'LA1', 'LA2', 'NA1', 'OC1', 'TR1', 'RU'];

    const regionMapping = {
        'NA1': 'americas',
        'BR1': 'americas',
        'LA1': 'americas',
        'LA2': 'americas',
        'OC1': 'sea',
        'KR': 'asia', 
        'JP1': 'asia',
        'EUN1': 'europe',
        'EUW1': 'europe',
        'TR1': 'europe',
        'RU': 'europe'
    };

    try {
        const allChallengerSummonerIds = await Promise.all(
            regions.map(async (region) => {
                const client = shortRegionClient(region);
                const response = await client.get('/tft/league/v1/challenger');
                const players = response.data.entries.slice(0, 1);
                return players.map(player => ({ summonerId: player.summonerId, region }));
            })
        );

        const challengerSummonerData = allChallengerSummonerIds.flat();
        const count = challengerSummonerData.length;

        const summonerPuuid = await Promise.all(
            challengerSummonerData.map(async ({ summonerId, region }) => {
                const client = shortRegionClient(region);
                const response = await client.get(`/tft/summoner/v1/summoners/${summonerId}`);
                return { puuid: response.data.puuid, region };
            })
        );

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


        const playerData = matchDetailsResponses.flatMap(response =>
            response.data.info.participants.map(participant => ({
                placement: participant.placement,
                units: participant.units.map(unit => ({ character_id: unit.character_id, items: unit.itemNames, tier: unit.tier })),
            }))
        );

        const champtionData = {};

        const championWinrate = playerData.reduce((acc, player) => {
            player.units.forEach(unit => {
                if (acc[unit.character_id]) {
                    acc[unit.character_id].totalGames += 1;
                    if (player.placement === 1) { // Top 4 is considered a win
                        acc[unit.character_id].wins += 1;
                    }
                } else {
                    acc[unit.character_id] = { totalGames: 1, wins: player.placement === 1 ? 1 : 0 }; // Top 4 is considered a win
                }
            });
            return acc;
        }, {});
        
        const winrate = Object.entries(championWinrate).map(([championId, { totalGames, wins }]) => ({
            championId,
            winrate: ((wins / totalGames) * 100).toFixed(2)
        }));
        
        const championPlacement = playerData.reduce((acc, player) => {
            player.units.forEach(unit => {
                if (acc[unit.character_id]) {
                    acc[unit.character_id].totalGames += 1;
                    acc[unit.character_id].placements.push(player.placement);
                } else {
                    acc[unit.character_id] = { totalGames: 1, placements: [player.placement] };
                }
            });
            return acc;
        }, {});
        
        const placement = Object.entries(championPlacement).map(([championId, { totalGames, placements }]) => ({
            championId,
            placement: (placements.reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2)
        }));
        const ranking = winrate.sort((a, b) => b.winrate - a.winrate);
        const placementRanking = placement.sort((a, b) => a.placement - b.placement);
        
        res.json({
            ranking,
            placementRanking
        });


    } catch (error) {
        console.error('Error fetching challenger players:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching challenger players');
    }
};

module.exports = { getChallengerPlayers };