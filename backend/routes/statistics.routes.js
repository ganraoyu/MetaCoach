const express = require('express');
const router = express.Router();
const { getChampionData } = require('../controllers/statistics/champion.controller');

router.get('/champions', getChampionData);

module.exports = router;