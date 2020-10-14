const routes = require('express').Router();
var throttle = require('express-throttle');

const configThrottle = require('../config/throttle');

const authController = require('./auth.controller');

const admin = require('../middlewares/admin');

routes.post(
  '/authenticate',
  throttle(configThrottle),
  async (req, res, next) => {
    const response = await authController
      .authenticate(req.body)
      .then(answer => {
        return answer;
      })
      .catch(error => {
        return error;
      });
    res.status(response.statusCode).send(response.result);
    next();
  }
);

routes.post(
  '/request-reset-password',
  throttle(configThrottle),
  async (req, res, next) => {
    const response = await authController
      .request(req.body)
      .then(answer => {
        return answer;
      })
      .catch(error => {
        return error;
      });
    res.status(response.statusCode).send(response.result);
    next();
  }
);

routes.post(
  '/reset-password',
  throttle(configThrottle),
  async (req, res, next) => {
    const response = await authController
      .reset(req.body)
      .then(answer => {
        return answer;
      })
      .catch(error => {
        return error;
      });
    res.status(response.statusCode).send(response.result);
    next();
  }
);

routes.post(
  '/change-password',
  admin,
  throttle(configThrottle),
  async (req, res, next) => {
    const response = await authController
      .change(req)
      .then(answer => {
        return answer;
      })
      .catch(error => {
        return error;
      });
    res.status(response.statusCode).send(response.result);
    next();
  }
);

module.exports = routes;
