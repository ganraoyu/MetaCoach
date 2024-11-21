const { fullRegionClient } = require('../utils/generalUtils')

const fetchPlayerPuuid = async (gameName, tagLine, region) => {
    const client = fullRegionClient(region)
    const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    const puuid = response.data.puuid;
    if(!puuid) {return null}
    return puuid
}

const fetchPlayerMatches = async (gameName, tagLine, region) => {
    
    const client = fullRegionClient(region)
    const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    const puuid = response.data.puuid

    const matchIdsResponse = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
    const playerMatchIds = matchIdsResponse.data.slice(0,10) //change slice later on

    const matchDetailResponses = await Promise.all(playerMatchIds.map((matchId) =>{
        return client.get(`/tft/match/v1/matches/${matchId}`);
    }))

    const playerMatchDetails = matchDetailResponses.map(response => response.data)
    return playerMatchDetails
}

module.exports = { fetchPlayerPuuid, fetchPlayerMatches }