const cors = require('cors');
const config = require('./../../config/server');

const isTokenOk = (req, res, next) => {
  if (req.headers.xtoken === config.xtoken) next();
  else {
    res.status(403).send('Permission deny.');
  }
};

module.exports = (app, routes) => {
  app.use(cors());
  Object.keys(routes).forEach(route => {
    app.all(`/${route}`, isTokenOk, routes[route]);
  });
};
