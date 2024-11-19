const championClient = require('../utils/championsClient.js');


const getChallengerChampionData = async (req, res) => {
    try {
        const championRanking = await championClient('challenger');
        res.json(championRanking);
    } catch (error) {
        console.error('Error fetching challenger players:', error.message);
        res.status(500).send('Error fetching challenger players');
    }
};

module.exports = { getChallengerChampionData };