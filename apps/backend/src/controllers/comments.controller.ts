import express from 'express';
import { Comment } from '../models/Comment';
const router = express.Router();

// Get specific comment
router.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const comment = await Comment.query().findById(id);
    console.log('get comment', { comment, id });
    
    if (comment) {
      response.json({ status: 200, comment });
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// Get comments
router.get('/', async (request, response, next) => {
  try {
    const comments = await Comment.query();
    console.log('get all comments', { comments });
    
    if (comments) {
      response.json({ comments });
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// Delete comment
router.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const deletedComment = await Comment.query().deleteById(id);
    
    console.log('delete comment ', { deletedComment, id });
    if (deletedComment) {
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// Create comment
router.post('/', async (request, response, next) => {
  try {
    if (request.body) {
      const comment = request.body;
      const createComment = await Comment.query().insert(comment);

      console.log('create comment', { createComment });
      if (createComment) {
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    } else {
      const invalidContentError = {
        message: 'Create comment was called without valid comment information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
})

// Update comment
router.put('/', async (request, response, next) => {
  try {
    if (request.body && request.body.id) {
      const comment = request.body;
      const updateComment = await Comment.query().findById(comment.id).patch(comment);
      
      console.log('update comment: ', { updateComment, original: comment });
      if (updateComment) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    } else {
      const invalidContentError = {
        message: 'Update comment was called without valid comment information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
});

module.exports = router;
