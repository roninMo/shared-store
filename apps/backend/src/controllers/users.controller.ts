import express from 'express';
import { db } from '../database';
import { User } from '../models/User';
import { Address } from '../models/Address';
import { Todo } from '../models/Todos';
import { Post } from '../models/Post';
const router = express.Router();

// get
router.get("/:id", async (request, response, next) => {
  try {
    const userId = request.params.id;
    // const user = await User.query().findById(userId);
    const user = await User.query().findById(userId);

    // Queries are like chainable events that run sql commands and also allow you to add custom modifiers also. You just need to build the functions on each class
    // You're also allowed to chain multiple objects together, so you don't have to write multiple sql commands

    // if (user.addressId) {
    //   const address = await Address.query().findById(userId);
    //   if (address) {
    //     user.address = address;
    //   }
    // }
    
    console.log('get user: ', { user });
    if (user) {
      response.json({ message: 'user found', user });
    } else {
      response.sendStatus(404);
    }

  } catch(error) {
    next(error);
  }
});

router.get('/:id/todos', async (request, response, next) => {
  try {
    const userId = request.params.id;
    const todos = await Todo.query().where('userId', userId);
    
    console.log(`get all todos for user ${userId}: `, { todos });
    if (todos) {
      response.json({ status: 200, todos });
    } else {
      response.sendStatus(404);
    }

  } catch(error) {
    next(error);
  }
});

router.get('/:id/posts', async (request, response, next) => {
  try {
    const userId = request.params.id;
    const posts = await Post.query().where('userId', userId);

    console.log(`get all posts for user ${userId}`, { posts });
    if (posts) {
      response.json({ status: 200, posts });
    } else {
      response.sendStatus(404);
    }

  } catch(error) {
    next(error);
  }
});

// get user posts
// get user information 

// get all
router.get("/", async (request, response, next) => {
  try {
    const allUsers = await User.query();
    console.log('get all users: ', { allUsers });
    
    if (allUsers) {
      response.json({ message: 'user found', users: allUsers })
    } else {
      response.sendStatus(204);
    }

  } catch(error) {
    next(error);
  }
});

// delete
router.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const deleteUser = await User.query().deleteById(id);
    
    console.log('delete user: ', { deleteUser, id });
    if (deleteUser) {
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }

  } catch(error) {
    next(error);
  }
});

// create
router.post("/", async (request, response, next) => {
  try {
    if (request.body) {
      const user = request.body;
      const createdUser = await User.query().insert(user); // instaceof User
      
      console.log('create user: ', {createdUser});
      if (createdUser) {
        response.sendStatus(200);
      } else {
        response.sendStatus(204);
      }
    } else {
      const invalidContentError = {
        message: 'Create user was called without the user information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
});

// update
router.put("/", async (request, response, next) => {
  try {
    if (request.body && request.body?.id) {
      const user = request.body;
      const updateUser = await User.query().findById(user.id).patch(user); // instanceof User
      
      console.log('update user: ', {updateUser, user});
      if (updateUser) {
        response.sendStatus(200);
      } else {
        response.sendStatus(204);
      }
    } else {
      const invalidContentError = {
        message: 'Update user was called without valid user information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
});


module.exports = router;