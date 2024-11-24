const express = require('express');
const router = express.Router();

const { getAboveMasterChampionData } = require('../../controllers/statistics/master+/champions.controller');
const { getBelowMasterChampionData } = require('../../controllers/statistics/master-/champions.controller');
const { getTraitsData } = require('../../controllers/statistics/master+/traits.controller');

// Route for above Master ranks (e.g., DIAMOND, EMERALD)
router.get('/:rank/champions', getAboveMasterChampionData);

// Route for traits data (presumably for above Master ranks)
router.get('/:rank/traits', getTraitsData);

// Route for below Master ranks, which requires both rank and division (e.g., DIAMOND/I, GOLD/II)
router.get('/:rank/:division/champions', getBelowMasterChampionData);

module.exports = router;
