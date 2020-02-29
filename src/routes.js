import { Router } from 'express';

const routes = new Router();

routes.get('/ping', (req, res) => res.send("pong"));

export default routes;
