const { shortRegionClient } = require('../../utils/generalClients');

const getChallengerPlayers = async (req, res) => {
    const regions = ['BR1', 'EUN1', 'EUW1', 'JP1', 'KR', 'LA1', 'LA2', 'NA1', 'OC1', 'TR1', 'RU'];

    try {
        const allChallengerSummonerIds = await Promise.all(
            regions.map(async (region) => {
                const client = shortRegionClient(region);
                const response = await client.get('/tft/league/v1/challenger');
                const players = response.data.entries;
                return players.map(player => player.summonerId);
            })
        );

        const challengerSummonerIds = allChallengerSummonerIds.flat();
        const count = challengerSummonerIds.length;

        res.json({
            message: 'Challenger players fetched successfully',
            challengerSummonerIds: challengerSummonerIds,
            count: count
        });
    } catch (error) {
        console.error('Error fetching challenger players:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching challenger players');
    }
};

module.exports = { getChallengerPlayers };