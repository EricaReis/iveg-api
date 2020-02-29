const Joi = require('@hapi/joi');

const userActions = require('./user.actions');
const createResponse = require('../common/createResponse');

const userController = {
  saveUser(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        bio: Joi.string(),
        url_img: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
      });

      const { error } = await schema.validate(data);
      if (error) return reject(createResponse(400, error));

      userActions
        .saveUser(data)
        .then(response => resolve(createResponse(200, response)))
        .catch(error => reject(createResponse(500, error)));
    });
  },
  findAll(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        limit: Joi.number().integer().min(1).max(100),
        offset: Joi.number().integer().min(0)
      })
      const { error } = await schema.validate(data);
      if (error) return reject(createResponse(400, error));

      userActions.findAll(data)
        .then(response => resolve(createResponse(200, response)))
        .catch(error => reject(createResponse(500, error)))
    })
  }
};

module.exports = userController;
