module.exports = {
    init(app){

      const staticRoutes = require("../routes/static");
      const logger = require('morgan');


      app.use(staticRoutes);
      app.use(logger('dev'));
    }
  }