const express = require('express');
const router = express.Router();

const { getAboveMasterChampionData } = require('../../controllers/statistics/master+/champions.controller');
const { getAboveMasterTraitsData } = require('../../controllers/statistics/master+/traits.controller');
const { getAboveMasterItemsData } = require('../../controllers/statistics/master+/items.controller');

const { getBelowMasterChampionData } = require('../../controllers/statistics/master-/champions.controller');
const { getBelowMasterTraitsData } = require('../../controllers/statistics/master-/traits.controller');
const { getBelowMasterItemsData } = require('../../controllers/statistics/master-/items.controller');

router.get('/:rank/champions', getAboveMasterChampionData);
router.get('/:rank/traits', getAboveMasterTraitsData);
router.get('/:rank/items', getAboveMasterItemsData);

router.get('/:rank/:division/champions', getBelowMasterChampionData);
router.get('/:rank/:division/traits', getBelowMasterTraitsData);
router.get('/:rank/:division/items', getBelowMasterItemsData);

module.exports = router;
