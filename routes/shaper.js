const express = require('express');
const router = express.Router();
const shaper_controller = require('../controllers/shaper_controller');

router.get('/', shaper_controller.shaper_list);

module.exports = router;
