const express = require('express');
const router = express.Router();
const { getChallengerPlayers } = require('../controllers/statistics/champion.controller');

router.get('/champions', getChallengerPlayers);

module.exports = router;