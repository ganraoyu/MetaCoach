const express = require('express');
const router = express.Router();

const { getChallengerChampionData } = require('../../controllers/statistics/challenger/champions.controller');
const { getGrandmasterChampionData } = require('../../controllers/statistics/grandmaster/champions.controller');
const { getMasterChampionData } = require('../../controllers/statistics/master/champions.controller');

const { getChallengerTraitsData } = require('../../controllers/statistics/challenger/traits.controller');

router.get('/challenger/champions', getChallengerChampionData);
router.get('/grandmaster/champions', getGrandmasterChampionData);
router.get('/master/champions', getMasterChampionData);

router.get('/challenger/traits', getChallengerTraitsData);

module.exports = router;