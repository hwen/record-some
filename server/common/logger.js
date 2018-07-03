const config = require('../../config/server');
const pathLib = require('path');

const env = process.env.NODE_ENV || 'development';

const log4js = require('log4js');
log4js.configure({
  appenders: {
    console: { type: 'console' },
    cheese: {
      type: 'file',
      filename: pathLib.join(config.log_dir, 'cheese.log')
    }
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
    loggly: { appenders: ['cheese'], level: 'info' }
  }
});

const logger = log4js.getLogger('cheese');
logger.level = config.debug && env !== 'test' ? 'DEBUG' : 'ERROR';

module.exports = logger;
