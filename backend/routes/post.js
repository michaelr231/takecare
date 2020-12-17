const express = require('express');

const postController = require('../controllers/post');
const check = require('../middleware/check-auth');
const extractFile = require('../middleware/file')
const router = express.Router();


router.post('',
  check, extractFile , postController.createPost  );



router.put('/:id',
  check, extractFile , postController.updatePost);


router.get('' , postController.getPosts);

router.get('/:id', check , postController.getPost);

router.delete('/:id', check , postController.deletePost);

module.exports = router;
