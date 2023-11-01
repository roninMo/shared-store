/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import helmet from 'helmet';
import express, { Application, NextFunction, Request, Response } from 'express';
import * as path from 'path';
import util from 'util';
import cors from 'cors';
import { corsConfig } from './utilities/cors';
import Knex from 'knex';
import { Model } from 'objection';
import { createDb, knexConfig } from './database';
import { objectionErrorHandler } from './utilities/errorHandlers';

const usersRoute = require('./controllers/users.controller');
const addressRoute = require('./controllers/address.controller');
const commentsRoute = require('./controllers/comments.controller');
const todosRoute = require('./controllers/todos.controller');
const postsRoute = require('./controllers/posts.controller');


class Backend {
  public express: Application = express();
  
  constructor() {
    // App configuration
    this.config();
    this.setAccessControl();
    this.buildRoutes();
  }
  
  protected config() {
    // Database configuration
    this.express.use(express.json());
    this.express.use(cors(corsConfig));
    this.express.use(helmet());
    
    // Database orm configuration
    const knex = Knex(knexConfig);
    Model.knex(knex);
    createDb(knex);
    
    // Authentication
    // -> Add swagger?
    // -> Is Logging necessary?
  }
  
  protected setAccessControl() {
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,Accept,Content-Type,Authorization',
      );
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }
  
  protected buildRoutes() {
    // Middleware that validates the objects passed into create and update functions?
    this.express.use('/users/', usersRoute);
    this.express.use('/addresses/', addressRoute);
    this.express.use('/comments/', commentsRoute);
    this.express.use('/todos/', todosRoute);
    this.express.use('/posts/', postsRoute);
    this.express.get('/api', (req, res) => {
      res.send({ message: 'express backend api!' });
    });

    // Response middleware
    this.express.use(objectionErrorHandler);
  }
}

export default new Backend().express;

// ready
const port = process.env.PORT || 3333;
const server = new Backend().express.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
