import express from 'express';
import { Todo } from '../models/Todos';
const router = express.Router();

// Get todo
router.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const todo = await Todo.query().findById(id);

    console.log('get todo: ', { todo, id });
    if (todo) {
      response.json({ status: 200, todo })
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// Get all todos
router.get('/', async (request, response, next) => {
  try {
    const todos = await Todo.query();
    console.log('get all todos: ', { todos });

    if (todos) {
      response.json({ status, todos });
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// Delete todo
router.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const deletedTodo = await Todo.query().deleteById(id);

    console.log('deleted todo: ', { deletedTodo, id });
    if (deletedTodo) {
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// Create todo
router.post('/', async (request, response, next) => {
  try {
    if (request.body) {
      const todo = request.body;
      const createTodo = await Todo.query().insert(todo);

      console.log('create todo: ', { createTodo });
      if (createTodo) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    } else {
      const invalidContentError = {
        message: 'Create todo was called without valid todo information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
});

// Update todo
router.put('/:id', async (request, response, next) => {
  try {
    if (request.body && request.body.id) {
      const todo = request.body;
      const updateTodo = await Todo.query().findById(todo.id).patch(todo);

      if (updateTodo) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    } else {
      const invalidContentError = {
        message: 'Update todo was called without valid todo information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
});

module.exports = router;
