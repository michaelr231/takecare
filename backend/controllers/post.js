const Post = require('../models/post');

exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'post added suscfuly',
      post: {
        ...createdPost,
        id: createdPost._id,
      }
    });

  }).catch(error => {
      res.status(500).json({
        message: 'creating a post faild!'
      })
    }
  );
}

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename
  }
  console.log(imagePath);
  const post = new Post ({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });

  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post )
    .then( result => {
      if (result.n > 0) {
        console.log(imagePath);
        console.log(post);
        res.status(200).json({meesage: 'update was success'});
      }
      res.status(401).json({meesage: 'Nout Authorized'});
    }).catch(error => {
    res.status(500).json({
      message: 'couldt update post'
    });
  })
}

exports.getPosts = (req, res, next) => {
  Post.find().then(
    document => {
      res.status(200).json({
        massage: 'Posts fetch succesfuly',
        posts: document
      })
    }).catch(error => {
    res.status(500).json({
      message: 'Fetching post faild'
    });
  });
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'post not found'});
    }
  }).catch(err => {
    res.status(500).json({
      message: 'Fetching post faild'
    })
  });
}

exports.deletePost = (req, res, next) =>
{
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId }).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({meesage: 'delete was success'});
    }
    res.status(401).json({meesage: 'Nout Authorized'});
  }).catch(err => {
    res.status(500).json({
      message: 'Cannot delete the post'
    })
  });;
}
