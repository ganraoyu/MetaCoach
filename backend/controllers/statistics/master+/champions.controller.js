const championsClient = require('../../../utils/statisticsUtils/championsUtils.js');

const getAboveMasterChampionData = async (req, res) => {
    const { rank } = req.params;
    try {
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

        const championRanking = await championsClient(rank);
        res.json(championRanking);
    } catch (error) {
        console.error(`Error fetching ${rank} players:`, error.message);
        res.status(500).send(`Error fetching ${rank} players`);
    }
};

module.exports = { getAboveMasterChampionData };