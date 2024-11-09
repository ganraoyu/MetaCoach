const express = require('express');
const router = express.Router();
const { playerWinRate, playerMostPlayedTraits } = require('../controllers/stats.controller');

router.get('/:region/:gameName/:tagLine', playerWinRate);
router.get('/:region/:gameName/:tagLine/traits', playerMostPlayedTraits);

module.exports = router;