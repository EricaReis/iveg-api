const Joi = require('@hapi/joi');

const recipeActions = require('./recipe.actions');
const createResponse = require('../common/createResponse');

const recipeController = {
    saveRecipe(data) {
        return new Promise(async (resolve, reject) => {
            const schema = Joi.object({
                name: Joi.string().required(),
                how_to_do: Joi.string().required(),
                amount: Joi.number().required(),
                url_img: Joi.string(),
                url_video: Joi.string(),
                user: Joi.string().required()
            });

            const { error } = await schema.validate(data);
            if (error) return reject(createResponse(400, error));

            recipeActions
                .saveRecipe(data)
                .then(response => resolve(createResponse(200, response)))
                .catch(error => reject(createResponse(500, error)));

        })
    },
    findAll(data) {
        return new Promise(async (resolve, reject) => {
            const schema = Joi.object({
                limit: Joi.number().integer().min(1).max(100),
                offset: Joi.number().integer().min(0)
            })
            const { error } = await schema.validate(data);
            if (error) return reject(createResponse(400, error));

            recipeActions.findAll(data)
                .then(response => resolve(createResponse(200, response)))
                .catch(error => reject(createResponse(500, error)))
        })
    },
    findOne(id) {
        return new Promise(async (resolve, reject) => {
            const schema = Joi.object({
                id: Joi.string().required()
            });
            const { error } = schema.validate({ id });
            if (error) return reject(createResponse(400, error));
            recipeActions.findOne(id)
                .then(recipe => resolve(createResponse(200, recipe)))
                .catch(error => reject(createResponse(400, error)))
        })
    }


}

module.exports = recipeController;