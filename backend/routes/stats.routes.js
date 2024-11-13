const express = require('express');
const router = express.Router();
const { playerWinRate, playerMostPlayedTraits, playerMostPlayedAugments } = require('../controllers/stats.controller');

router.get('/:region/:gameName/:tagLine', playerWinRate);
router.get('/:region/:gameName/:tagLine/traits', playerMostPlayedTraits);
router.get('/:region/:gameName/:tagLine/augments', playerMostPlayedAugments);

module.exports = router;