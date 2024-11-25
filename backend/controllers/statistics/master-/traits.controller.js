const traitsClient = require('../../../utils/statisticsUtils/traitsUtils');

const getBelowMasterTraitsData = async (req, res) => {
    const { rank, division} = req.params

    try{
        console.log(rank, division)
        const getTraitsRanking = await traitsClient(rank, division)
        res.json(getTraitsRanking)
    } catch (error){
        console.log(error)
    }
}

module.exports = { getBelowMasterTraitsData }