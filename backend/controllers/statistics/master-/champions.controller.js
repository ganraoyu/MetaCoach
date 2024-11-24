const championsClient = require('../../../utils/statisticsUtils/championsUtils.js');

const getBelowMasterChampionData = async (req, res) => {
    const { rank, division } = req.params;

    try{
        const championRanking = await championsClient(rank, division)
        res.json({championRanking})
    } catch(error){
        console.log(error)
    }
}

module.exports = { getBelowMasterChampionData }