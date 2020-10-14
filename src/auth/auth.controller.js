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
        .then(response => resolve(createResponse(200, response)))
        .catch(error => reject(createResponse(500, error)));
    });
  },
  request(data) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'br'] },
          })
          .max(100)
          .required(),
      });

      const { error } = await schema.validate(data);
      if (error) return reject(createResponse(400, error));

      authActions
        .request(data)
        .then(response => resolve(createResponse(200, response)))
        .catch(err => reject(createResponse(500, err)));
    });
  },
  reset(email) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'br'] },
          })
          .max(100)
          .required(),
      });

      const { error } = schema.validate({ email });
      if (error) return reject(createResponse(400, error));

      authActions
        .reset(email)
        .then(recipe => resolve(createResponse(200, recipe)))
        .catch(err => reject(createResponse(400, err)));
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
        if (res) {
          resolve(createResponse(200, 'Senha alterada com sucesso'));
        } else {
          resolve(createResponse(404, 'Senha não encontrada'));
        }
      });
    });
  },
};

module.exports = authController;
