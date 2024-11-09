const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const axiosClient = require('../utils/axiosClient');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const RIOT_API_KEY = process.env.RIOT_API_KEY; 

const playerWinRate = async (req, res) => {

    const { gameName, tagLine, region } = req.params;

    if(!gameName || !tagLine) {
        return res.status(400).send('Please provide both gameName and tagLine as path parameters.');
    }

    try{
        const client = axiosClient(region);

        const response = await client.get(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
        const puuid = response.data.puuid;

        if(!puuid){
            return res.status(404).send('Puuid not found');
        }
        const matchHistoryResponse = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);

        const matchIds = matchHistoryResponse.data.slice(0,9);

        const matchDetailsPromises = matchIds.map(matchId =>
            client.get(`/tft/match/v1/matches/${matchId}`)
        );

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);

        
        const playerWinResults = matchDetails.map(matches =>{

            const participant = matches.info.participants.find(
                participant => participant.puuid === puuid
            );

            if(participant){
                return participant.win === true;
            } else {
                return false;
            }
        })
            
        const totalWins = playerWinResults.filter(result => result === true).length;
        const totalGames = playerWinResults.length;
        const winRate = totalWins / totalGames * 100;

        res.json({
            winRate: winRate,
            totalWins: totalWins,
        });  

        /* only for recent 20 matches */ 

    } catch(error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}

const playerMostPlayedTraits = async (req, res) => {

    const { gameName, tagLine } = req.params;

    try{
        const response = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        const puuid = response.data.puuid;

        const matchHistoryResponse = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids`, {
            headers: {
                'X-Riot-Token': RIOT_API_KEY
            }
        });

        const matchIds = matchHistoryResponse.data;

        const matchDetailsPromises = matchIds.map(matchId =>
            axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${matchId}`, {
                headers: {
                    'X-Riot-Token': RIOT_API_KEY
                }
            })
        );

        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        const matchDetails = matchDetailsResponses.map(response => response.data);

        res.json({
            message: 'Match history fetched successfully',
            matchDetails: matchDetails
        });
    } catch(error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error connecting to Riot API');
    }
}
module.exports = { playerWinRate };