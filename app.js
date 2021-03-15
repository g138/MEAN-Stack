const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRouter = require("./routes/posts");
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

app.use("/api/posts", postsRouter);

module.exports = app;