var express = require('express');
var router = express.Router();
const create_controller = require('../controllers/create_controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('create', { title: 'Create New Item' });
});

router.get('/shaper', function (req, res, next) {
  res.render('shaper_create_form', { title: 'Create New Shaper' });
});

router.post('/shaper', create_controller.create_shaper_post);

router.get('/model', create_controller.create_surfboardModel_get);

router.post('/model', create_controller.create_surfboardModel_post);

router.get('/instance', create_controller.create_surfboardInstance_get);

router.post('/instance', create_controller.create_surfboardInstance_post);

router.get('/delete', create_controller.delete_item_get);

router.post('/delete/instance', create_controller.delete_instance_post);

router.post('/delete/model', create_controller.delete_model_post);

router.post('/delete/shaper', create_controller.delete_shaper_post);

module.exports = router;
