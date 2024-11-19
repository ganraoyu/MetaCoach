const express = require('express');
const router = express.Router();

const { getChampionData } = require('../../controllers/statistics/master+/champions.controller');
const { getTraitsData } = require('../../controllers/statistics/master+/traits.controller');

router.get('/:rank/champions', getChampionData);
router.get('/:rank/traits', getTraitsData);

module.exports = router;