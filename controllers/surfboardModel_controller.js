const SurfboardModel = require('../models/surfboardModel');
const SurfboardInstance = require('../models/surfboardInstance');
const Shaper = require('../models/shaper');
const async = require('async');
const { body, validationResult } = require('express-validator');
const { Schema } = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const { uploadFile } = require('../s3');

// Display list of all models.
exports.surfboardModel_list = function (req, res, next) {
  SurfboardModel.find()
    .populate('shaper')
    .exec((err, model_list) => {
      if (err) return next(err);
      // If theres no error we render
      res.render('surfboardModel_list', {
        title: 'All Board Models',
        model_list: model_list,
      });
    });
};

exports.surfboardModel_detail = function (req, res, next) {
  async.parallel(
    {
      model(callback) {
        SurfboardModel.findById(req.params.id)
          .populate('shaper')
          .exec(callback);
      },
      instances(callback) {
        SurfboardInstance.find({ model: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);

      res.render('surfboardModel_detail', {
        model: results.model,
        items: results.instances,
      });
    }
  );
};

exports.surfboardModel_create_get = function (req, res, next) {
  res.render('surfboardModel_create', {
    title: 'Add a new board model',
  });
};

exports.surfboardModel_create_post = [
  upload.single('image'),
  body('shaperName')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isAlphanumeric()
    .withMessage('Shapers Name must have only alphanumeric characters'),
  body('location')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isAlphanumeric()
    .withMessage('Shapers location must have only alphanumeric characters'),
  // After validation and sanitisation req can be processed
  async function (req, res, next) {
    // Extract errors using validationResult
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('shaper_create_form', {
        title: 'Create New Shaper',
        shaper: req.body,
        errors: errors.array(),
      });
      return;
    }
    // If it makes it to here data is valid, upload the image to s3 and grab the url from there to put in the db
    const result = await uploadFile(req.file);
    const imageUrl = result.Location;

    const model = new SurfboardModel({
      shaperName: req.body.shaper,
      location: req.body.location,
      image: imageUrl,
    });

    shaper.save((err) => {
      if (err) return next(err);
      // Success!
      res.redirect(shaper.url);
    });
  },
];
