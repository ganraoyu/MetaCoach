const { fullRegionClient } = require('../utils/generalUtils')

const fetchPlayerPuuid = async (gameName, tagLine, region) => {
    const client = fullRegionClient(region)
    const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    const puuid = response.data.puuid;
    if(!puuid) {return null}
    return puuid
}

const fetchPlayerMatches = async (puuid, region) => {
    const client = fullRegionClient(region)
    const response = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
    const matchIds = response.data;
    return matchIds
}

module.exports = { fetchPlayerPuuid, fetchPlayerMatches }