const Joi = require('@hapi/joi');

const commentsActions = require('./comments.actions');

const commentsController = {
  async addComment(req, res) {
    const schema = Joi.object({
      idRecipe: Joi.string().required(),
      comment: Joi.string().required(),
    });

    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send(error);

    commentsActions.addComment({ req, res });
  },
  async deleteComment(req, res) {
    const schema = Joi.object({
      idRecipe: Joi.string().required(),
      idComment: Joi.string().required(),
    });

    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send(error);

    commentsActions.deleteComment({ req, res });
  },
  async editComment(req, res) {
    const schema = Joi.object({
      idRecipe: Joi.string().required(),
      idComment: Joi.string().required(),
      comment: Joi.string().required(),
    });

    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send(error);

    commentsActions.editComment({ req, res });
  },
};

module.exports = commentsController;
