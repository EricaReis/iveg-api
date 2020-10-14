const recipeRoutes = require('express').Router();
const security = require('../config/security');

const recipeController = require('./recipe.controller');

recipeRoutes.post('/recipe', security, async (req, res, next) => {
  const response = await recipeController
    .saveRecipe(req.body)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

recipeRoutes.get('/recipe', async (req, res, next) => {
  const response = await recipeController
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

recipeRoutes.get('/recipe/:id', async (req, res, next) => {
  const response = await recipeController
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

recipeRoutes.patch('/recipe/:id', async (req, res, next) => {
  const response = await recipeController
    .editRecipe(req)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
});

recipeRoutes.delete('/recipe/:id', async (req, res, next) => {
  const response = await recipeController
    .deleteRecipe(req.params.id)
    .then(answer => {
      return answer;
    })

    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = recipeRoutes;
