const express = require('express');
const { playerPuuid, playerMatches } = require('../../controllers/player/player.controller.js');
const router = express.Router();

router.get('/:region/:gameName/:tagLine', playerPuuid);
router.get('/:region/matches/:gameName/:tagLine', playerMatches);


module.exports = router;

