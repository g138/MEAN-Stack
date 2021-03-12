const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");
const app = express();
// grCS4cGnAM1tHt6a

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb+srv://gaurav:grCS4cGnAM1tHt6a@cluster0.bskds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then( () => console.log("connected to DB."))
.catch( err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save().then(result => {
      res.status(201).json({
        message: 'Post added successfully',
        postId: result._id
      });
    })
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({
    _id: req.params.id,
  }, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Post updated successfully'
    })
  })
})

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted"  
    })
  })
  ;
})
  
module.exports = app;