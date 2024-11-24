const championsClient = require('../../../utils/statisticsUtils/championsUtils.js');
const { shortRegionClient } = require('../../../utils/generalUtils');
const { regions } = require('../../../utils/regionData.js');

const getBelowMasterChampionData = async (req, res) => {
    const { rank, division } = req.params;

    try{
        const fetchSummonerId = await Promise.all(
            regions.map(async (region) => {
                const client = shortRegionClient(region);
                const response = await client.get(
                    `/tft/league/v1/entries/${rank}/${division}?queue=RANKED_TFT&page=1`
                );
                const players = response.data.slice(0,1)
                return players.map(player => ({ summonerId: player.summonerId, region }));
            })
        )

        res.json({fetchSummonerId})
    } catch(error){
        console.log(error)
    }
}

module.exports = { getBelowMasterChampionData, fetchSummonerIds }