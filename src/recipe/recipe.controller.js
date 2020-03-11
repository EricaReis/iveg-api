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
    },
    editRecipe(req) {
        return new Promise(async (resolve, reject) => {
            const schema = Joi.object({
                id: Joi.object().required(),
                name: Joi.string(),
                how_to_do: Joi.string(),
                amount: Joi.number(),
                url_img: Joi.string(),
                url_video: Joi.string(),
                user: Joi.string()
            });
            const { error } = schema.validate({ ...req.params, ...req.body });
            if (error) return reject(createResponse(400, error));

            userActions
                .editRecipe(req)
                .then(recipe => {
                    if (recipe) {
                        resolve(
                            createResponse(
                                200, 'Receita alterada com sucesso'
                            )
                        )
                    }
                    else {
                        resolve(createResponse(404, 'Receita não encontrada'))
                    }
                })
        })
    },
    deleteRecipe(id) {
        return new Promise(async (resolve, reject) => {
            const schema = Joi.object({
                id: Joi.string().required()
            });

            const { error } = schema.validate({ id });
            if (error) return reject(createResponse(400, error));

            recipeActions
                .deleteRecipe(id)
                .then(recipe => {
                    if (recipe) {
                        resolve(
                            createResponse(
                                200, `Receita de ${recipe.name} deletada com sucesso`
                            )
                        )
                    }
                    else {
                        resolve(createResponse(404, 'receita não encontrada'))
                    }
                })



        })


    }
};

module.exports = recipeController;