const recipeRoutes = require('express').Router();

const recipeController = require('./recipe.controller');

recipeRoutes.post('/recipe', async (req, res, next) => {
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
})


module.exports = recipeRoutes;