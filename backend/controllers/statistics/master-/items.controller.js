const itemsClient = require('../../../utils/statisticsUtils/ItemsUtils');

const getBelowMasterItemsData = async (req, res) => {
    const { rank, division} = req.params

    try{
        console.log(rank, division)
        const getItemsRanking = await itemsClient(rank, division)
        res.json(getItemsRanking)
    } catch (error){
        console.log(error)
    }
}

module.exports = { getBelowMasterItemsData }