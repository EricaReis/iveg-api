/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const pictureActions = require('./picture.actions');
const createResponse = require('../common/createResponse');

const recipePictureController = {
  uploadImage(req) {
    return new Promise(async (resolve, reject) => {
      const { id } = req.body;
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error } = schema.validate({ id });
      if (error) return reject(createResponse(400, error));
      pictureActions
        .uploadFile(req)
        .then(message => {
          return resolve(createResponse(200, message));
        })
        .catch(err => {
          return reject(createResponse(400, err));
        });
    });
  },
  deleteImage(id) {
    return new Promise(async (resolve, reject) => {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error } = schema.validate({ id });
      if (error) return reject(createResponse(400, error));
      pictureActions
        .deleteFile(id)
        .then(message => {
          return resolve(createResponse(200, message));
        })
        .catch(err => {
          return reject(createResponse(400, err));
        });
    });
  },
};

module.exports = recipePictureController;
