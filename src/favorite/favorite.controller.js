const Joi = require('@hapi/joi');

const favoriteActions = require("./favorite.actions")

const favoriteController = {
  async addToFavorite(req, res) {
    const schema = Joi.object({
      idRecipe: Joi.string().required(),
    })

    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send(error);

    favoriteActions.addToFavorite({ req, res });
  },
  async removeFromFavorite(req, res) {
    const schema = Joi.object({
      idRecipe: Joi.string().required(),
    })

    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send(error);

    favoriteActions.removeFromFavorite({ req, res });
  },
  async find(req, res) {
    const schema = Joi.object({
      limit: Joi.number()
        .integer()
        .min(1)
        .max(100),
      offset: Joi.number()
        .integer()
        .min(0),
    });

    const { error } = await schema.validate({ ...req.query });
    if (error) return res.status(400).send(error);

    favoriteActions.find({ req, res })
  }
};

module.exports = favoriteController;