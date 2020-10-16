const userRoutes = require('express').Router();

const userController = require('./user.controller');

const security = require('../config/security');

userRoutes.post('/user', async (req, res, next) => {
  const response = await userController
    .saveUser(req.body)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

userRoutes.get('/user', security, async (req, res, next) => {
  const response = await userController
    .findAll(req.query)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

userRoutes.get('/user/:id', security, async (req, res, next) => {
  const response = await userController
    .findOne(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

userRoutes.patch('/user/:id', security, async (req, res, next) => {
  const response = await userController
    .editUser(req)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
});

userRoutes.delete('/user/:id', security, async (req, res, next) => {
  const response = await userController
    .deleteUser(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = userRoutes;
