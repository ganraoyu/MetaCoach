const { fetchPlayerMatches, fetchPlayerPuuid } = require('../../utils/playerUtils.js')

const getPlayerWinRate = async (req, res) => {
    const { gameName, tagLine, region } = req.params;

    try {
        const playerMatchDetails = await fetchPlayerMatches(gameName, tagLine, region);

        if (!playerMatchDetails.length) {return res.status(404).send('No matches found for this player.');}

        const puuid = await fetchPlayerPuuid(gameName, tagLine, region);

        let totalGames = 0;
        let wins = 0;
        let placements = []
        let totalPlacement = 0;

        playerMatchDetails.forEach(match => {
            if (!match.info || !match.info.participants) return;
        
            match.info.participants.forEach(participant => {
                if (participant.puuid !== puuid) return;

                totalGames++;  
                if (participant.placement === 1) wins++; 
                placements.push(participant.placement);
                totalPlacement += participant.placement
            });
        });


        const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;
        const placementRate = totalGames > 0 ? totalPlacement / totalGames : 0

        res.json({ totalGames, wins, winRate, placementRate, placements  });

    } catch (error) {
        console.error('Error fetching player winrate:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
};

const getPlayerMostPlayedTraits = async (req, res) => {
    const { gameName, tagLine, region} = req.params

    try{
        const playerMatchDetails = await fetchPlayerMatches(gameName, tagLine, region)

        const  puuid = await fetchPlayerPuuid(gameName, tagLine, region)

        const traits = []

        playerMatchDetails.forEach(match => {
            if (!match.info || !match.info.participants) return;

            match.info.participants.forEach(participant => {
                if (participant.puuid !== puuid) return
                
                participant.traits.forEach(trait => {
                    const existingTrait = traits.find(t => t.name === trait.name);

                    if (existingTrait) {
                        existingTrait.num_units += trait.num_units;
                    } else {
                        traits.push({ name: trait.name, num_units: trait.num_units });
                    }
                });    
            });
        });

        const sortedTraits = traits.sort((a,b) => b.num_units - a.num_units)

        res.json({ sortedTraits })
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