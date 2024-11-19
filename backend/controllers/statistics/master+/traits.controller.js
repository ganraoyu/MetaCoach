const traitsClient = require('../../../utils/statisticsClients/traitsClient');

const getTraitsData = async (req, res) => {
    const { rank } = req.params;
    try {
        const getTraitsRanking = await traitsClient(rank);
        res.json(getTraitsRanking);
    } catch (error) {
        console.error('Error fetching challenger traits:', error.message);
        res.status(500).send('Error fetching challenger traits');
    }
}

module.exports = { getTraitsData };

