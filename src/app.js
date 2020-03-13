require('dotenv/config');

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const database = require('./config/database');
const userRoutes = require('./user/user.routes');
const recipeRoutes = require('./recipe/recipe.routes');
const security = require('./config/security');

database(process.env.DATABASE);


class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(), (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
      next();
    });
    this.app.use(express.json());
    this.app.use(security);
  }

  routes() {
    this.app.use(routes);
    this.app.use(userRoutes);
    this.app.use(recipeRoutes);
  }
}

module.exports = new App();
