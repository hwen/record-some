const mongoose = require('mongoose');
const config = require('../../config/server');
const logger = require('../common/logger');

mongoose.Promise = Promise;

mongoose.connect(
  config.db,
  {
    server: { poolSize: 20 }
  },
  function(err) {
    if (err) {
      logger.error('connect to %s error: ', config.db, err.message);
      process.exit(1);
    }
  }
);
