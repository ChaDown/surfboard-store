const express = require('express');
const router = express.Router();
const shaper_controller = require('../controllers/shaper_controller');

router.get('/', shaper_controller.shaper_list);

router.get('/:id', shaper_controller.shaper_detail);

module.exports = router;
