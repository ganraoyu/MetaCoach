const { shortRegionClient, fullRegionClient } = require('../../utils/generalClients');
const { regions, regionMapping } = require('../../utils/regionData.js');

const getChampionData = async (req, res) => {

    try {
        const allChallengerSummonerIds = await Promise.all(
            regions.map(async (region) => {
                const client = shortRegionClient(region);
                const response = await client.get('/tft/league/v1/challenger');
                const players = response.data.entries.slice(0, 1);
                return players.map(player => ({ summonerId: player.summonerId, region }));
            })
        );

        if(allChallengerSummonerIds.length === 0) {
            res.status(404).send('No challenger players found');
            return;
        }

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

        if(puuids.length === 0) {
            res.status(404).send('No challenger players found');
            return;
        }

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

        if(matchDetailsResponses.length === 0) {
            res.status(404).send('No challenger Matches found');
            return;
        }

        const playerData = matchDetailsResponses.flatMap(response =>
            response.data.info.participants.map(participant => ({
                placement: participant.placement,
                units: participant.units.map(unit => ({ character_id: unit.character_id, items: unit.itemNames, tier: unit.tier })),
            }))
        );

        if(playerData.length === 0) {
            res.status(404).send('No challenger player data found');
            return;
        }

        const championData = playerData.reduce((acc, player) => {
            player.units.forEach(unit => {
                if (acc[unit.character_id]) {
                    acc[unit.character_id].totalGames += 1;
                    acc[unit.character_id].placements.push(player.placement);
                    if (player.placement === 1) { 
                        acc[unit.character_id].wins += 1;
                    }
                } else {
                    acc[unit.character_id] = {
                        totalGames: 1,
                        placements: [player.placement],
                        wins: player.placement <= 1 ? 1 : 0
                    };
                }
            });
            return acc;
        }, {});
        
        const championRanking = Object.entries(championData).map(([championId, { totalGames, wins, placements }]) => ({
            championId,
            winrate: (((wins / totalGames) * 100).toFixed(2)) + '%',
            placement: (placements.reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2)
        }));

        const sortedChampionRanking = championRanking.sort((a, b) => a.placement - b.placement);

        res.json({
            sortedChampionRanking
        });

    } catch (error) {
        console.error('Error fetching challenger players:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching challenger players');
    }
};

module.exports = { getChampionData };