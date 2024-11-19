const championsClient = require('../utils/championsClient.js');


const getGrandmasterChampionData = async (req, res) => {
    try {
        const championsRanking = await championsClient('grandmaster');
        res.json(championsRanking);
    } catch (error) {
        console.error('Error fetching challenger players:', error.message);
        res.status(500).send('Error fetching challenger players');
    }
};

module.exports = { getGrandmasterChampionData };