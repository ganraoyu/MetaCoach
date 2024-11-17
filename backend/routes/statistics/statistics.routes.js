const express = require('express');
const router = express.Router();
const { getChampionData } = require('../../controllers/statistics/challenger/champion.controller');

router.get('/champions', getChampionData);

module.exports = router;