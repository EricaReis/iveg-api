const favoriteRoutes = require('express').Router();
const security = require('../config/security');

const favoriteController = require('./favorite.controller');

favoriteRoutes.get("/favorite/find", security, favoriteController.find);
favoriteRoutes.post("/favorite/add", security, favoriteController.addToFavorite);
favoriteRoutes.post("/favorite/remove", security, favoriteController.removeFromFavorite);

module.exports = favoriteRoutes;