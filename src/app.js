require('dotenv/config');

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const database = require('./config/database');
const userRoutes = require('./user/user.routes');
const recipeRoutes = require('./recipe/recipe.routes');


const app = express();

database(process.env.DATABASE);

app.use(cors());

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
    this.app.use(userRoutes);
    this.app.use(recipeRoutes);
  }
}

module.exports = new App();
