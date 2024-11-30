const express = require('express');
const router = express.Router();
const { getChallengerLeaderboard, getMasterLeaderboard, getGrandmasterLeaderboard, getBelowMasterLeaderboard } = require('../../controllers/leaderboard/leaderboard.controller.js');
    
router.get('/:region/:mode/challenger', getChallengerLeaderboard);
router.get('/:region/:mode/grandmaster', getGrandmasterLeaderboard);
router.get('/:region/:mode/master', getMasterLeaderboard);
router.get('/:region/:mode/:rank/:division', getBelowMasterLeaderboard)

module.exports = router;
