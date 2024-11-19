const championsClient = require('../utils/championsClient.js');


const getMasterChampionData = async (req, res) => {
    try {
        const championsRanking = await championsClient('master');
        res.json(championsRanking);
    } catch (error) {
        console.error('Error fetching challenger players:', error.message);
        res.status(500).send('Error fetching master players');
    }
};

module.exports = { getMasterChampionData };