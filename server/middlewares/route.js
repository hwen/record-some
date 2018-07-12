const cors = require('cors');

module.exports = (app, routes) => {
  console.log(routes);
  Object.keys(routes).forEach(route => {
    app.all(`/${route}`, cors(), routes[route]);
  });
};
