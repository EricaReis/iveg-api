const Recipe = require('./recipe.model');
const formatResponse = require('../common/formatResponse');
const recipeActions = {
  saveRecipe(data) {
    return new Promise((resolve, reject) => {
      Recipe.create(data)
        .then(() => {
          return resolve('Receita cadastrada com sucesso!');
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  findAll(data) {
    return new Promise((resolve, reject) => {
      const limit = parseInt(data.limit) || 10;
      const offset = data.offset || 0;
      Recipe.find()
        .limit(limit)
        .skip(limit * offset)
        .populate('user')
        .sort({ createdAt: -1 })
        .then(res => {
          return resolve(formatResponse(res, { limit, offset }));
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  findOne(id) {
    return new Promise((resolve, reject) => {
      Recipe.findById(id)
        .then(recipe => {
          return resolve(recipe);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  editRecipe(req) {
    return new Promise((resolve, reject) => {
      Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then(recipe => {
          return resolve(recipe);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  deleteRecipe(id) {
    return new Promise((resolve, reject) => {
      Recipe.findByIdAndDelete(id)
        .then(recipe => {
          return resolve(recipe);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};

module.exports = recipeActions;
