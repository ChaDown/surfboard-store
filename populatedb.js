#! /usr/bin/env node

console.log(
  'This script populates some test surfboard models, shapers and surfboard instances - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const SurfboardModel = require('./models/surfboardModel');
const Shaper = require('./models/shaper');
const SurfboardInstance = require('./models/surfboardInstance');

const mongoose = require('mongoose');
const { modelName } = require('./models/shaper');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const surfboardModels = [];
const shapers = [];
const surfboardInstances = [];

function surfboardModelCreate(style, shaper, model, price, image, cb) {
  modeldetail = {
    style: style,
    shaper: shaper,
    model: model,
    price: price,
    image: image,
  };

  const surfboardModel = new SurfboardModel(modeldetail);

  surfboardModel.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Model: ' + modeldetail);
    surfboardModels.push(surfboardModel);
    cb(null, surfboardModel);
  });
}

function shaperCreate(name, location, image, cb) {
  const shaper = new Shaper({
    shaperName: name,
    location: location,
    image: image,
  });

  shaper.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New shaper: ' + shaper);
    shapers.push(shaper);
    cb(null, shaper);
  });
}

function surfboardInstanceCreate(size, model, cb) {
  const surfboardInstance = new SurfboardInstance({ size: size, model: model });
  surfboardInstance.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New surfboardInstance: ' + surfboardInstance);
    surfboardInstances.push(surfboardInstance);
    cb(null, surfboardInstance);
  });
}

function createSurfboardModelsShapers(cb) {
  async.series(
    [
      function (callback) {
        shaperCreate(
          'Pyzel',
          'Hawaii',
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/pyzel.jpg',
          callback
        );
      },
      function (callback) {
        shaperCreate(
          'JS',
          'Australia',
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/js.jpeg',
          callback
        );
      },
      function (callback) {
        shaperCreate(
          'DHD',
          'Australia',
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/dhd.jpg',
          callback
        );
      },
      function (callback) {
        shaperCreate(
          'Lost',
          'California',
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/lost.jpg',
          callback
        );
      },
      function (callback) {
        shaperCreate(
          'Softech',
          'US',
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/softech.jpg',
          callback
        );
      },
      function (callback) {
        shaperCreate(
          'Pukas',
          'Spain',
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/pukas.jpg',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createModels(cb) {
  async.series(
    [
      function (callback) {
        surfboardModelCreate(
          'Shortboard',
          shapers[0],
          'Ghost',
          799,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/ghost.jpg',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Shortboard',
          shapers[0],
          'Pyzalien',
          749,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/pyzalien.jpg',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Shortboard',
          shapers[1],
          'Black Box III',
          899,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/blak-box.jpg',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Fish',
          shapers[1],
          'Flame Fish',
          699,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/flame.jpg',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Shortboard',
          shapers[2],
          'Sweet Spot',
          799,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/sweetspot.jpg',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Fish',
          shapers[2],
          'Mini Twin',
          799,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/mini-twin.jog.webp',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Shortboard',
          shapers[3],
          'Sabotaj',
          729,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/sabotaj.jpg',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Fish',
          shapers[3],
          'Aqua Fish',
          929,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/hydra.jpg',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Foamboard',
          shapers[4],
          'Flash',
          429,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/flash.jpg',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Foamboard',
          shapers[4],
          'The Egg',
          399,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/egg.webp',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Shortboard',
          shapers[5],
          '69er',
          799,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/69.jpg',
          callback
        );
      },
      function (callback) {
        surfboardModelCreate(
          'Longboard',
          shapers[5],
          'Christenson Dead Sled',
          1229,
          'https://surfboardbucket.s3.eu-west-1.amazonaws.com/deadsled.jpg',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createInstances(cb) {
  async.series([
    function (callback) {
      surfboardInstanceCreate("5'11", surfboardModels[0], callback);
    },
    function (callback) {
      surfboardInstanceCreate("6'1", surfboardModels[0], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'9", surfboardModels[1], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'6", surfboardModels[1], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'11", surfboardModels[2], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'8", surfboardModels[2], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'1", surfboardModels[3], callback);
    },
    function (callback) {
      surfboardInstanceCreate("6'3", surfboardModels[3], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'10", surfboardModels[4], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'8", surfboardModels[5], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'6", surfboardModels[5], callback);
    },
    function (callback) {
      surfboardInstanceCreate("6'3", surfboardModels[6], callback);
    },
    function (callback) {
      surfboardInstanceCreate("6'4", surfboardModels[6], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'11", surfboardModels[7], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'11", surfboardModels[8], callback);
    },
    function (callback) {
      surfboardInstanceCreate("6'10", surfboardModels[9], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'6", surfboardModels[10], callback);
    },
    function (callback) {
      surfboardInstanceCreate("5'3", surfboardModels[10], callback);
    },
    function (callback) {
      surfboardInstanceCreate("8'11", surfboardModels[11], callback);
    },
    function (callback) {
      surfboardInstanceCreate("9'2", surfboardModels[11], callback);
    },
    function (callback) {
      surfboardInstanceCreate("9'0", surfboardModels[11], callback);
    },
  ]);
}

async.series(
  [createSurfboardModelsShapers, createModels, createInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('BOOKInstances: ' + bookinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
