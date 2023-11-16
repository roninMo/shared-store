import express from 'express';
import { db } from '../database';
import { User, UserValidationInformation, UserValidationResponse } from '../models/User';
import { Address } from '../models/Address';
import { Comment } from '../models/Comment';
import { Todo } from '../models/Todos';
import { Post } from '../models/Post';
import { db_validAddress, db_validUser, constructUser, extractAddress, extractUser } from '../utilities/utils';
const router = express.Router();

// get
router.get("/:id", async (request, response, next) => {
  try {
    const userId = request.params.id;
    const user = await User.query()
      .findById(userId)
      .join('address', 'user.addressId', 'address.id')
      .select('address.*', 'user.*');
    // Queries are like chainable events that run sql commands and also allow you to add custom modifiers also. You just need to build the functions on each class
    // You're also allowed to chain multiple objects together, so you don't have to write multiple sql commands
    
    const responseObject = { message: 'user found', user };
    console.log('get user information: ', { userId, user });
    if (db_validUser(user) && db_validAddress(user)) {
      response.json({ ...responseObject, user: constructUser(user) });
    } else if (user) {
      response.json(responseObject);
    } else {
      response.sendStatus(404);
    }

  } catch(error) {
    next(error);
  }
});

// get user todos
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

// get user posts
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

// get all user information 14
router.get('/:id/information', async (request, response, next) => {
  try {
    const userId = request.params.id;
    const user = await User.query().findById(userId);

    if (user) {
      const address = await Address.query().findById(user.addressId);
      const todos = await Todo.query().where('userId', userId);
      const posts = await Post.query().where('userId', userId);
      // const posts = await Post.query()
      //   .select('*')
      //   .leftJoin('comment as comments', 'post.id', 'comments.postId');

      response.json({ status: 200, message: 'user information', 
        user: {...user, address}, todos, posts
      });
    }
    else {
      response.sendStatus(404);
    }

  } catch(error) {
    next(error);
  }
})

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
    const userInformation = request.body;
    const addressInformation = userInformation?.address;

    if (db_validUser(userInformation)) {
      console.log('valid user');
      const user: User = extractUser(userInformation);
      if (db_validAddress(addressInformation)) {
        const address: Address = extractAddress(addressInformation);
        const createdAddress = await Address.query().insert(address);

        if (createdAddress) {
          const createdUser = await createdAddress.$relatedQuery('user').insert({...user, addressId: createdAddress.id });
          response.json({ message: 'user created', address, user, createdUser, createdAddress });
        } else {
          response.sendStatus(204);
        }

      } else {
        console.log('adding user');
        const createdUser = await Address.query().insert(user);
        console.log('create user: ', { createdUser });
        if (createdUser) {
          response.sendStatus(200);
        } else {
          response.sendStatus(204);
        }
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


// Server side display/validation
router.post('/:id/validatevalues', async (request, response, next) => {
  try {
    const userId = request.params.id;
    const user = await User.query().findById(userId);
    
    console.log('user information: ', user);
    if (user && request.body) {
      const updateInformationValues: UserValidationInformation = request.body;
      let validation: UserValidationResponse;

      console.log('updateInformation: ', updateInformationValues);
      // This logic is dummy logic just to build a connection for validations on this side 
      if (updateInformationValues.key && updateInformationValues.value) {
        // name - no numbers
        if (updateInformationValues.key == 'name') {
          const noNumbersOrSpecialCharacters = new RegExp('^[a-zA-Z]*$');
          validation = noNumbersOrSpecialCharacters.test(updateInformationValues.value) ? null : 'enter a valid name';
        }

        // phone - this needs to have the proper format
        if (updateInformationValues.key == 'phone') {
          const tenDigitNumberValidation = new RegExp('^[0-9]{10}$'); // Actual validations can be handled on the client
          validation = tenDigitNumberValidation.test(updateInformationValues.value) ? null : 'the phone number is invalid';
        }

        // username - validations and rules for this
        if (updateInformationValues.key == 'username') {
          // If username is not already taken
          const noNumbersOrSpecialCharacters = new RegExp('^[a-zA-Z]*$');
          validation = noNumbersOrSpecialCharacters.test(updateInformationValues.value) ? null : 'the username is invalid';
        }

        // email address - email validations
        if (updateInformationValues.key == 'email') {
          validation = null;
        }

        response.json({ status: 200, validation });
      }
      else
      {
        response.sendStatus(204);
      }
    }
    else {
      response.sendStatus(404);
    }

  } catch(error) {
    next(error);
  }
})




module.exports = router;
