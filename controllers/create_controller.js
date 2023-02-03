const SurfboardModel = require('../models/surfboardModel');
const SurfboardInstanceModel = require('../models/surfboardInstance');
const Shaper = require('../models/shaper');
const async = require('async');
const { body, validationResult } = require('express-validator');
const { Schema } = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const { uploadFile } = require('../s3');
const surfboardModel = require('../models/surfboardModel');

exports.create_shaper_get = function (req, res, next) {
  res.render('shaper_create_form', {
    title: 'Create New Shaper',
  });
};

exports.create_shaper_post = [
  upload.single('image'),
  body('shaperName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Must be between 1 - 50 characters')
    .escape(),
  body('location').trim().isLength({ min: 1, max: 30 }).escape(),
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

    const shaper = new Shaper({
      shaperName: req.body.shaperName,
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

exports.create_surfboardModel_get = function (req, res, next) {
  Shaper.find().exec((err, shapers) => {
    if (err) return next(err);
    res.render('surfboardModel_create', {
      title: 'Add New Model',
      shapers: shapers,
    });
  });
};

exports.create_surfboardModel_post = [
  upload.single('image'),
  body('model')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('surfboardModels Name must have only alphanumeric characters'),
  body('shaper')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please choose one of the shapers provided'),
  body('price')
    .isNumeric()
    .trim()
    .escape()
    .withMessage('Price must be a number'),
  body('style')
    .trim()
    .escape()
    .isIn(['Shortboard', 'Longboard', 'Foamboard', 'Fish'])
    .withMessage('Please choose one of the style options provided'),
  // After validation and sanitisation req can be processed
  async function (req, res, next) {
    // Extract errors using validationResult
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('surfboardModel_create', {
        title: 'Create New surfboardModel',
        model: req.body,
        errors: errors.array(),
      });
      return;
    }
    // If it makes it to here data is valid, upload the image to s3 and grab the url from there to put in the db
    const result = await uploadFile(req.file);
    const imageUrl = result.Location;

    const surfboardModel = new SurfboardModel({
      style: req.body.style,
      shaper: req.body.shaper,
      model: req.body.model,
      price: req.body.price,
      image: imageUrl,
    });

    surfboardModel.save((err) => {
      if (err) return next(err);
      // Success!
      res.redirect(surfboardModel.url);
    });
  },
];

exports.create_surfboardInstance_get = function (req, res, next) {
  SurfboardModel.find()
    .populate('shaper')
    .exec((err, results) => {
      if (err) return next(err);
      res.render('surfboardInstance_create', {
        title: 'Add New Stock',
        models: results,
      });
    });
};

exports.create_surfboardInstance_post = [
  body('model').trim().escape(),
  body('size').trim().isLength({ min: 1, max: 8 }),
  function (req, res, next) {
    // Extract errors using validationResult
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('surfboardInstance_create', {
        title: 'Create New surfboardModel',
        model_instance: req.body,
        errors: errors.array(),
      });
      return;
    }

    const surfboardInstanceModel = new SurfboardInstanceModel({
      size: req.body.size,
      model: req.body.model,
    });

    surfboardInstanceModel.save((err) => {
      if (err) return next(err);
      //Success!
      res.redirect(`/surfboardModel/${req.body.model}`);
    });
  },
];

exports.delete_item_get = function (req, res, next) {
  async.parallel(
    {
      shaper(cb) {
        Shaper.find().exec(cb);
      },
      model(cb) {
        SurfboardModel.find().populate('shaper').exec(cb);
      },
      instance(cb) {
        SurfboardInstanceModel.find()
          .populate({
            path: 'model',
            populate: {
              path: 'shaper',
              options: { sort: { model: 1 } },
            },
          })
          .exec(cb);
      },
    },
    (err, results) => {
      if (err) return next(err);

      res.render('delete_item', {
        title: 'Remove Item from Store',
        shapers: results.shaper,
        models: results.model,
        instances: results.instance,
      });
    }
  );
};

exports.delete_instance_post = function (req, res, next) {
  SurfboardInstanceModel.findByIdAndDelete(req.body.instance).exec((err) => {
    if (err) return next(err);
    res.redirect('/create/delete');
  });
};

exports.delete_model_post = function (req, res, next) {
  async.parallel(
    {
      instance(cb) {
        SurfboardInstanceModel.deleteMany({
          model: req.body.model,
        }).exec(cb);
      },
      model(cb) {
        SurfboardModel.findByIdAndDelete(req.body.model).exec(cb);
      },
    },
    (err) => {
      if (err) return next(err);
      res.redirect('/create/delete');
    }
  );
};

exports.delete_shaper_post = function (req, res, next) {
  async.waterfall(
    [
      // Find models with this shaper, delete them then pass them on
      function getModels(callback) {
        SurfboardModel.find(
          { shaper: req.body.shaper },
          function (err, models) {
            if (err) return next(err);
            callback(null, models);
          }
        );
      },
      function deleteInstances(models, callback) {
        // For each model, delete all instances of it
        if (models.length > 0) {
          models.forEach((res) => {
            SurfboardInstanceModel.deleteMany({ model: res._id }, (err) => {
              if (err) return next(err);
            });
          });
        }
        callback(null);
      },
      function deleteModels(callback) {
        surfboardModel.deleteMany({ shaper: req.body.shaper }, (err) => {
          if (err) return next(err);
          callback(null);
        });
      },
      // Delete shaper
      function deleteShaper(callback) {
        Shaper.findByIdAndDelete(req.body.shaper, (err) => {
          if (err) return next(err);
          callback(null);
        });
      },
    ],
    (err) => {
      if (err) return next(err);
      // Success!
      res.redirect('/create/delete');
    }
  );
};
