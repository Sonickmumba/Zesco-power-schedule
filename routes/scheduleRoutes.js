const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// GET /schedules?town=XYZ
router.get('/', scheduleController.getByTown);

module.exports = router;
