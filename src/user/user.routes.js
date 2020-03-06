const userRoutes = require('express').Router();

const userController = require('./user.controller');

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

userRoutes.get('/user', async (req, res, next) => {
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
})

userRoutes.get('/user/:id', async (req, res, next) => {
  const response = await userController
    .findOne(req.params.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    })
  res.status(response.statusCode).send(response.result);
  next();
})

userRoutes.patch('/user/:id', async (req, res, next) => {
  const response = await userController
    .editUser(req)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    })
  res.status(response.statusCode).send(response.result);
})

userRoutes.delete('/user/:id', async (req, res, next) => {
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
})


module.exports = userRoutes;
