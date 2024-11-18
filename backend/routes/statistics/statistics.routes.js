const express = require('express');
const router = express.Router();
const { getChallengerChampionData } = require('../../controllers/statistics/challenger/champions.controller');

router.get('/:rank/champions', getChallengerChampionData);

module.exports = router;