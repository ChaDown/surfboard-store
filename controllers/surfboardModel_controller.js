const SurfboardModel = require('../models/surfboardModel');
const SurfboardInstance = require('../models/surfboardInstance');
const Shaper = require('../models/shaper');
const async = require('async');
const { body, validationResult } = require('express-validator');
const { Schema } = require('mongoose');

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

// Author.find()
//   .sort([['family_name', 'ascending']])
//   .exec(function (err, list_authors) {
//     if (err) {
//       return next(err);
//     }
//     //Successful, so render
//     res.render('author_list', {
//       title: 'Author List',
//       author_list: list_authors,
//     });
//   });
