const express = require('express');
const router = express.Router();

const { getAboveMasterChampionData } = require('../../controllers/statistics/master+/champions.controller');
const { getAboveMasterTraitsData } = require('../../controllers/statistics/master+/traits.controller');

const { getBelowMasterChampionData } = require('../../controllers/statistics/master-/champions.controller');
const { getBelowMasterTraitsData } = require('../../controllers/statistics/master-/traits.controller');

router.get('/:rank/champions', getAboveMasterChampionData);
router.get('/:rank/traits', getAboveMasterTraitsData);


router.get('/:rank/:division/champions', getBelowMasterChampionData);
router.get('/:rank/:division/traits', getBelowMasterTraitsData)

module.exports = router;
