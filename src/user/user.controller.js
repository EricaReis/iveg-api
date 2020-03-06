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
  },
  findOne(id) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required()
      });

      const { error } = schema.validate({ id });
      if (error) return reject(createReponse(400, error));
      userActions.findOne(id)
        .then(user => resolve(createResponse(200, user)))
        .catch(error => reject(createResponse(400, error)))
    })
  },
  editUser(req) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        bio: Joi.string(),
        url_img: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      });

      const { error } = schema.validate({ ...req.params, ...req.body });
      if (error) return reject(createResponse(400, error));

      userActions
        .editUser(req)
        .then(user => {
          if (user) {
            resolve(
              createResponse(
                200, `Usuário ${user.name} alterado com sucesso`
              )
            )
          }
          else {
            resolve(createResponse(404, 'usuário não encontrado'))
          }
        })
    })
  },
  deleteUser(id) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required()
      });

      const { error } = schema.validate({ id });
      if (error) return reject(createResponse(400, error));

      userActions
        .deleteUser(id)
        .then(user => {
          if (user) {
            resolve(
              createResponse(
                200, `Usuário ${user.name} deletado com sucesso`
              )
            )
          }
          else {
            resolve(createResponse(404, 'usuário não encontrado'))
          }
        })
    })
  }
};

module.exports = userController;
