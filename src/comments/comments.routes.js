const commentsRoutes = require('express').Router();
const security = require('../config/security');

const commentsController = require('./comments.controller');

commentsRoutes.post('/comments', security, commentsController.addComment);
commentsRoutes.delete('/comments', security, commentsController.deleteComment);
commentsRoutes.patch('/comments', security, commentsController.editComment);

module.exports = commentsRoutes;
