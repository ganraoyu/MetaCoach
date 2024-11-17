const express = require('express');
const router = express.Router();
const { getPlayerWinRate, getPlayerMostPlayedTraits, getPlayerMostPlayedAugments } = require('../../controllers/player/playerStatistics.controller');

router.get('/:region/:gameName/:tagLine', getPlayerWinRate);
router.get('/:region/:gameName/:tagLine/traits', getPlayerMostPlayedTraits);
router.get('/:region/:gameName/:tagLine/augments', getPlayerMostPlayedAugments);

module.exports = router;