const Recipe = require('./recipe.model');
const formatResponse = require('../common/formatResponse');
const recipeActions = {
    saveRecipe(data) {
        return new Promise((resolve, reject) => {
            Recipe.create(data).then(() => {
                return resolve("Receita cadastrada com sucesso!")
            }).catch(err => {
                return reject(err)
            })
        })
    },
    findAll(data) {
        return new Promise((resolve, reject) => {
            const limit = parseInt(data.limit) || 10;
            const offset = data.offset || 0;
            Recipe.find().limit(limit).skip(limit * offset).then(res => {
                return resolve(formatResponse(res, { limit, offset }))
            }).catch(err => {
                return reject(err)
            })
        })
    }
}

module.exports = recipeActions