const cors = require('cors');

module.exports = (app, routes) => {
  app.use(cors());
  Object.keys(routes).forEach(route => {
    app.all(`/${route}`, routes[route]);
  });
};
