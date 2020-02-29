import 'dotenv/config';

import express from 'express';

import routes from './routes';
const database = require('./config/database');


database(process.env.DATABASE);

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }


}

export default new App().server;
