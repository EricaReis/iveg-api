/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const authActions = require('./auth.actions');
const createResponse = require('../common/createResponse');

const authController = {
  authenticate(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        password: Joi.string().required(),
      });

      const { error } = await schema.validate(data);
      if (error) return reject(createResponse(400, error));

      authActions
        .authenticate(data)
        .then(response =>
          resolve(createResponse(response.status, response.message))
        )
        .catch(error => reject(createResponse(500, error)));
    });
  },
  change(req) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        oldPassword: Joi.string()
          .max(24)
          .required(),
        newPassword: Joi.string()
          .max(24)
          .required(),
      });

      const { error } = schema.validate({ ...req.params, ...req.body });
      if (error) return reject(createResponse(400, error));

      authActions.change(req).then(res => {
        resolve(createResponse(res.status, res.message));
      });
    });
  },
};

module.exports = authController;
