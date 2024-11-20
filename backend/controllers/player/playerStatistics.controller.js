const { fullRegionClient } = require('../../utils/generalUtils');

const getPlayerWinRate = async (req, res) => {
    try{
        
    } catch(error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}

const getPlayerMostPlayedTraits = async (req, res) => {
 
    try{

    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
};

const getPlayerMostPlayedAugments = async (req, res) =>{

    try{

    } catch (error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}


module.exports = { getPlayerWinRate, getPlayerMostPlayedTraits, getPlayerMostPlayedAugments };