import express from 'express';
import { db } from '../database';
import { User } from '../models/User';
const router = express.Router();

// get
router.get("/:id", async (request, response, next) => {
  try {
    const user = await User.query().findById(request.params.id); // instanceof User
    // Queries are like chainable events that run sql commands and also allow you to add custom modifiers also. You just need to build the functions on each class
    // You're also allowed to chain multiple objects together, so you don't have to write multiple sql commands
    
    console.log('get users user: ', {user, id: request.params.id});
    if (user) {
      response.json({ message: 'user found', user })
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// get all
router.get("/", async (request, response, next) => {
  try {
    const allUsers = await User.query();
    console.log('get/ ', {request, response, allUsers});  
    
    console.log('get all users user: ', {allUsers});
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
    const deleteUser = User.query().deleteById(request.params.id);

    console.log('delete user: ', {deleteUser, id: request.params.id});
  } catch(error) {
    next(error);
  }
});

// create
router.post("/", async (request, response, next) => {
  try {
    if (request.body) {
      const user = request.body;
      const createdUser = User.query().insert(user); // instaceof User
      
      console.log('create user: ', {createdUser, user});
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
      const updateUser = User.query().findById(user).patch(user); // instanceof User
      
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