const express = require('express');
const router = express.Router();
const { getChallengerChampionData } = require('../../controllers/statistics/challenger/champions.controller');
const { getGrandmasterChampionData } = require('../../controllers/statistics/grandmaster/champions.controller');
const { getMasterChampionData } = require('../../controllers/statistics/master/champions.controller');

router.get('/challenger/champions', getChallengerChampionData);
router.get('/grandmaster/champions', getGrandmasterChampionData);
router.get('/master/champions', getMasterChampionData);

module.exports = router;