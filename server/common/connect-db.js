const mongoose = require('mongoose');
const config = require('../../config/server');
const logger = require('../common/logger');

mongoose.Promise = Promise;

mongoose.connect(
  config.db,
  {
    // https://fastfoodcoding.com/questions/1506230044801/how-to-fix-the-server-replset-mongos-options-are-deprecated-all-their-options-are-supported-at-the-top-level-of-the-options-object-in-nodejs
    poolSize: 20,
    // https://stackoverflow.com/questions/50448272/avoid-current-url-string-parser-is-deprecated-warning-by-setting-usenewurlpars
    useNewUrlParser: true
  },
  function(err) {
    if (err) {
      logger.error('connect to %s error: ', config.db, err.message);
      process.exit(1);
    }
  }
);
