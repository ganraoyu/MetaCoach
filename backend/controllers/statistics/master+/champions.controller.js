const championsClient = require('../../../utils/statisticsClients/championsClient.js');

const getChampionData = async (req, res) => {
    const { rank } = req.params;
    try {
        const championRanking = await championsClient(rank);
        res.json(championRanking);
    } catch (error) {
        console.error('Error fetching challenger players:', error.message);
        res.status(500).send('Error fetching challenger players');
    }
};

module.exports = { getChampionData };