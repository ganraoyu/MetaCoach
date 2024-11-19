const traitsClient = require('../../../utils/statisticsClients/traitsClient');

const getTraitsData = async (req, res) => {
    try {
        const getTraitsData = await traitsClient(rank);
        res.json(getTraitsData);
    } catch (error) {
        console.error('Error fetching challenger traits:', error.message);
        res.status(500).send('Error fetching challenger traits');
    }
}

module.exports = { getTraitsData };

