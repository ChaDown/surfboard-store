var express = require('express');
var router = express.Router();
const surfboardModel_controller = require('../controllers/surfboardModel_controller');

// GET surfboardModel home page.
router.get('/', surfboardModel_controller.surfboardModel_list);

router.get('/:id', surfboardModel_controller.surfboardModel_detail);
// // GET request for creating a surfboardModel. NOTE This must come before routes that display surfboardModel (uses id).
// router.get(
//   '/surfboardModel/create',
//   surfboardModel_controller.surfboardModel_create_get
// );

// // POST request for creating surfboardModel.
// router.post(
//   '/surfboardModel/create',
//   surfboardModel_controller.surfboardModel_create_post
// );

// // GET request to delete surfboardModel.
// router.get(
//   '/surfboardModel/:id/delete',
//   surfboardModel_controller.surfboardModel_delete_get
// );

// // POST request to delete surfboardModel.
// router.post(
//   '/surfboardModel/:id/delete',
//   surfboardModel_controller.surfboardModel_delete_post
// );

// // GET request to update surfboardModel.
// router.get(
//   '/surfboardModel/:id/update',
//   surfboardModel_controller.surfboardModel_update_get
// );

// // POST request to update surfboardModel.
// router.post(
//   '/surfboardModel/:id/update',
//   surfboardModel_controller.surfboardModel_update_post
// );

// // GET request for one surfboardModel.
// router.get(
//   '/surfboardModel/:id',
//   surfboardModel_controller.surfboardModel_detail
// );

// // GET request for list of all surfboardModel items.
// router.get('/surfboardModels', surfboardModel_controller.surfboardModel_list);

module.exports = router;
