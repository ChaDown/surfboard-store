const SurfboardModel = require('../models/surfboardModel');
const SurfboardInstance = require('../models/surfboardInstance');
const Shaper = require('../models/shaper');
const async = require('async');
const { body, validationResult } = require('express-validator');
const { Schema } = require('mongoose');
const shaper = require('../models/shaper');

exports.shaper_list = function (req, res, next) {
  Shaper.find().exec((err, shapers) => {
    if (err) return next(err);

    res.render('shaper_list', {
      title: 'All Shapers',
      shapers: shapers,
    });
  });
};

exports.shaper_detail = function (req, res, next) {
  async.parallel(
    {
      shaper(callback) {
        Shaper.findById(req.params.id).exec(callback);
      },
      model(callback) {
        SurfboardModel.find({ shaper: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      //Success
      res.render('shaper_detail', {
        title: results.shaper.shaperName,
        shaper: results.shaper,
        models: results.model,
      });
    }
  );
};
