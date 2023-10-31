/* eslint-disable @typescript-eslint/no-var-requires */
// import sequelize from 'sequelize';
import helmet from 'helmet';
import express from 'express';
import * as path from 'path';
import util from 'util';
import cors from 'cors';
import { corsConfig } from './utilities/cors';




// initialization
const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors(corsConfig));
app.use(helmet());




// routes
const usersRoute = require('./controllers/users.controller');
const commentsRoute = require('./controllers/comments.controller');
const todosRoute = require('./controllers/todos.controller');
const postsRoute = require('./controllers/posts.controller');

app.use('/users/', usersRoute);
app.use('/comments/', commentsRoute);
app.use('/todos/', todosRoute);
app.use('/posts/', postsRoute);
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});




// ready
const expressBackend = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
expressBackend.on('error', console.error);
