const express = require('express');
const { getPlayerByGameNameAndTagLine, getPlayerMatches, summonerInfo } = require('../../controllers/player/player.controller.js');
const router = express.Router();

router.get('/:region/:gameName/:tagLine', getPlayerByGameNameAndTagLine);
router.get('/matches/:region/:gameName/:tagLine', getPlayerMatches);
router.get('/summoner/:region/:shortRegion/:gameName/:tagLine', summonerInfo);

module.exports = router;

