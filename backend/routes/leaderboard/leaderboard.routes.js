const express = require('express');
const router = express.Router();
const { getChallengerLeaderboard, getMasterLeaderboard, getGrandmasterLeaderboard, getBelowMasterLeaderboard } = require('../../controllers/leaderboard/leaderboard.controller.js');
    
router.get('/:region/challenger', getChallengerLeaderboard);
router.get('/:region/grandmaster', getGrandmasterLeaderboard);
router.get('/:region/master', getMasterLeaderboard);
router.get('/:region/:rank/:division', getBelowMasterLeaderboard)

module.exports = router;
