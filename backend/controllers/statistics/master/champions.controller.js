const championClient = require('../utils/championClient.js');


const getMasterChampionData = async (req, res) => {
    try {
        const championRanking = await championClient('master');
        res.json(championRanking);
    } catch (error) {
        console.error('Error fetching challenger players:', error.message);
        res.status(500).send('Error fetching master players');
    }
};

module.exports = { getMasterChampionData };