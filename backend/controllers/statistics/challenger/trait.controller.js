const { shortRegionClient, fullRegionClient } = require('../../../utils/generalClients.js');
const { regions, regionMapping } = require('../../../utils/regionData.js');

const getTraitData = async (req, res) => {

    try{
        const allChallengerSummonerIds = await Promise.all(
            region.map( async (region) => {
                const client = shortRegionClient(region);
                const response = await client.get('/tft/league/v1/challenger');
                const players = response.data.entries.slice(0, 1);
                return players.map(player => ({ summonerId: player.summonerId, region }));
            })
        )
    } catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}; 