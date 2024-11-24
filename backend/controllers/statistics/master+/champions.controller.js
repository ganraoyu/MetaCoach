const championsClient = require('../../../utils/statisticsUtils/championsUtils.js');

const getAboveMasterChampionData = async (req, res) => {
    const { rank } = req.params;
    try {
        const championRanking = await championsClient(rank);
        res.json(championRanking);
    } catch (error) {
        console.error(`Error fetching ${rank} players:`, error.message);
        res.status(500).send(`Error fetching ${rank} players`);
    }
};

module.exports = { getAboveMasterChampionData };