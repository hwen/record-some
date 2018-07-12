const config = require('./../config/server');

require('colors');
require('./middlewares/mongoose_log');
require('./utils/connect-db');
const path = require('path');
const express = require('express');
const session = require('express-session');
const errorPageMiddleware = require('./middlewares/error_page');
const _ = require('lodash');
const compress = require('compression');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const errorhandler = require('errorhandler');
// const cors = require('cors');
const requestLog = require('./middlewares/request_log');
const renderMiddleware = require('./middlewares/render');
const route = require('./middlewares/route');
const routes = require('./controllers');
const logger = require('./common/logger');
const helmet = require('helmet');
const bytes = require('bytes');

// 静态文件目录
const staticDir = path.join(__dirname, '../dist');

// assets
const assets = {};

const urlinfo = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

const app = express();

// configuration in all env
app.set('views', path.join(__dirname, '../dist'));
app.set('view engine', 'html');

// app.enable('trust proxy');

// Request logger。请求时间
app.use(requestLog);

if (config.debug) {
  // 渲染时间
  app.use(renderMiddleware.render);
}

app.use(express.static(staticDir));
// app.use('/agent', proxyMiddleware.proxy);

// 通用的中间件
app.use(require('response-time')());
app.use(helmet.frameguard('sameorigin'));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(require('method-override')());
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());
app.use(
  session({
    secret: config.session_secret,
    // store: new RedisStore({
    //   port: config.redis_port,
    //   host: config.redis_host,
    //   db: config.redis_db,
    //   pass: config.redis_password
    // }),
    resave: false,
    saveUninitialized: false
  })
);

// oauth 中间件
// app.use(passport.initialize());

// github oauth
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
// passport.use(new GitHubStrategy(config.GITHUB_OAUTH, githubStrategyMiddleware));

// custom middleware
// app.use(auth.authUser);
// app.use(auth.blockUser());

// if (!config.debug) {
//   app.use(function(req, res, next) {
//     if (req.path === '/api' || req.path.indexOf('/api') === -1) {
//       csurf()(req, res, next);
//       return;
//     }
//     next();
//   });
//   app.set('view cache', true);
// }

// set static, dynamic helpers
_.extend(app.locals, {
  config: config,
  assets: assets
});

app.use(errorPageMiddleware.errorPage);
app.use(function(req, res, next) {
  res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
  next();
});

app.use(
  busboy({
    limits: {
      fileSize: bytes(config.file_limit)
    }
  })
);
route(app, routes);

// error handler
if (config.debug) {
  app.use(errorhandler());
} else {
  app.use(function(err, req, res, next) {
    logger.error(err);
    return res.status(500).send('500 status');
  });
}
logger.info(app._router.stack);

if (!module.parent) {
  app.listen(config.port, function() {
    logger.info('RecordSome listening on port', config.port);
    logger.info('You know I lvoe you....');
    logger.info(
      'You can debug your app with http://' +
        config.hostname +
        ':' +
        config.port
    );
    logger.info('');
  });
}

module.exports = app;
