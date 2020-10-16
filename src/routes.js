const routes = require('express').Router();

routes.get('/ping', (req, res) => res.status(200).send('pong'));

module.exports = routes;
