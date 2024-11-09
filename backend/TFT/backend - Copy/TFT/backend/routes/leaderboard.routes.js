const express = require('express');
const router = express.Router();
const { getChallengerLeaderboard, getMasterLeaderboard, getGrandmasterLeaderboard } = require('../controllers/leaderBoard.controller.js');
    
router.get('/challenger/:region', getChallengerLeaderboard);
router.get('/grandmaster/:region', getGrandmasterLeaderboard);
router.get('/master/:region', getMasterLeaderboard);

module.exports = router;
