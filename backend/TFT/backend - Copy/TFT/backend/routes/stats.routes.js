const express = require('express');
const router = express.Router();
const { playerWinRate } = require('../controllers/stats.controller');

router.get('/:region/:gameName/:tagLine', playerWinRate);

module.exports = router;