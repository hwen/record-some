const config = require('../../config/server');
const pathLib = require('path');

const env = process.env.NODE_ENV || 'development';

const log4js = require('log4js');
log4js.configure({
  appenders: {
    console: { type: 'console' },
    recordsome_out: {
      type: 'file',
      filename: pathLib.join(config.log_dir, 'recordsome_out.log'),
      maxLogSize: 10485760,
      compress: true
    }
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
    recordsome_out: {
      appenders: ['recordsome_out', 'console'],
      level: 'error',
      layout: { type: 'coloured' }
    }
  }
});

let logCategory = 'default';
if (!config.debug && env !== 'development') {
  logCategory = 'recordsome_out';
}
console.log(`============= log category: [${logCategory}] =============`);
const logger = log4js.getLogger(logCategory);
logger.err = logger.error;

module.exports = logger;
