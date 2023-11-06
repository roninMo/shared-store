import express from 'express';
import { db } from '../database';
import { Post } from '../models/Post';
const router = express.Router();

// Get post
router.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const post = await Post.query().findById(id);

    console.log('get post: ', {post, id});
    if (post) {
      response.json({ status: 200, post });
    } else {
      response.sendStatus(404);
    }

  } catch(error) {
    next(error);
  }
});

// Get all posts 
router.get('/', async (request, response, next) => {
  try {
    const posts = await Post.query();
    console.log ('get all posts: ', { posts });
  
    if (posts) {
      response.json({ status: 200, posts });
    } else {
      response.sendStatus(404);
    }

  } catch(error) {
    next(error);
  }
});

// Delete post
router.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const deletePost = await Post.query().deleteById(id);

    console.log('delete post: ', { deletePost, id });
    if (deletePost) {
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
}); 

// Create post
router.post('/', async (request, response, next) => {
  try {
    if (request.body) {
      const post = request.body;
      const createPost = await Post.query().insert(post);

      console.log('create post: ', { createPost });
      if (createPost) {
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    } else {
      const invalidContentError = {
        message: 'Create post was called without valid post information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
})

// Update post
router.put('/', async (request, response, next) => {
  try {
    if (request.body && request.body.id) {
      const post = request.body;
      const updatePost = await Post.query().findById(post.id).patch(post);

      console.log('update post: ', { updatePost });
      if (updatePost) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    } else {
      const invalidContentError = {
        message: 'Update post was called without valid post information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
});

module.exports = router;
