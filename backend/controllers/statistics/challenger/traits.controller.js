const traitsClient = require('../utils/traits.client');

const getChallengerTraitsData = async (req, res) => {
    try {
        const traitsData = await traitsClient('challenger');
        res.json(traitsData);
    } catch (error) {
        console.error('Error fetching challenger traits:', error.message);
        res.status(500).send('Error fetching challenger traits');
    }
}

module.exports = { getChallengerTraitsData };

