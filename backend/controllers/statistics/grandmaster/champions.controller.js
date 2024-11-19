const championClient = require('../utils/championClient.js');


const getGrandmasterChampionData = async (req, res) => {
    try {
        const championRanking = await championClient('grandmaster');
        res.json(championRanking);
    } catch (error) {
        console.error('Error fetching challenger players:', error.message);
        res.status(500).send('Error fetching challenger players');
    }
};

module.exports = { getGrandmasterChampionData };