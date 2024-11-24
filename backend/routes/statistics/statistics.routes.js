const express = require('express');
const router = express.Router();

const { getAboveMasterChampionData } = require('../../controllers/statistics/master+/champions.controller');
const { getBelowMasterChampionData } = require('../../controllers/statistics/master-/champions.controller');
const { getTraitsData } = require('../../controllers/statistics/master+/traits.controller');


router.get('/:rank/champions', getAboveMasterChampionData);


router.get('/:rank/traits', getTraitsData);


router.get('/:rank/:division/champions', getBelowMasterChampionData);

module.exports = router;
