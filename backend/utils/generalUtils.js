const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const RIOT_API_KEY = process.env.RIOT_API_KEY;

const fullRegionClient = (region) => {
    return axios.create({
        baseURL: `https://${region}.api.riotgames.com`, //americas, europe, asia
        headers: {
            'X-Riot-Token': RIOT_API_KEY
        }
    })
}; 

const shortRegionClient = (shortRegion) => {
    return axios.create({
        baseURL:`https://${shortRegion}.api.riotgames.com`, //na1, euw1, sg1
        headers: {
            'X-Riot-Token': RIOT_API_KEY
        }
    })
};

module.exports = { fullRegionClient, shortRegionClient };
