const recipePictureRoutes = require('express').Router();

const recipePictureController = require('./picture.controller');

recipePictureRoutes.post('/recipe-picture', async (req, res, next) => {
  const response = await recipePictureController
    .uploadImage(req)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

recipePictureRoutes.delete('/recipe-picture', async (req, res, next) => {
  const response = await recipePictureController
    .deleteImage(req.body.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = recipePictureRoutes;
