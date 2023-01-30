const SurfboardModel = require('../models/surfboardModel');
const SurfboardInstance = require('../models/surfboardInstance');
const Shaper = require('../models/shaper');
const async = require('async');
const { body, validationResult } = require('express-validator');
const { Schema } = require('mongoose');
const shaper = require('../models/shaper');

exports.shaper_list = function (req, res, next) {
  shaper.find().exec((err, shapers) => {
    if (err) return next(err);

    res.render('shaper_list', {
      title: 'All Shapers',
      shapers: shapers,
    });
  });
};
