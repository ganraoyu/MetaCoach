const itemsClient = require('../../../utils/statisticsUtils/ItemsUtils');

const getAboveMasterItemsData = async (req, res) => {
    const { rank } = req.params

    try{
        console.log(rank)
        const getItemsRanking = await itemsClient(rank, division)
        res.json(getItemsRanking)
    } catch (error){
        console.log(error)
    }
}

module.exports = { getAboveMasterItemsData }