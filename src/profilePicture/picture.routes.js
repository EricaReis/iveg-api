const pictureRoutes = require('express').Router();

const profilePictureController = require('./picture.controller');

pictureRoutes.post('/profile', async (req, res, next) => {
  const response = await profilePictureController
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

pictureRoutes.delete('/profile', async (req, res, next) => {
  const response = await profilePictureController
    .deleteImage(req.headers.id)
    .then(answer => {
      return answer;
    })
    .catch(error => {
      return error;
    });
  res.status(response.statusCode).send(response.result);
  next();
});

module.exports = pictureRoutes;
