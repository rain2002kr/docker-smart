const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const apiUserRouter = require("./routes/api/user.js");


const app = express();
const port = 3001;

/* APP USE  */
// load the cookie-parsing middleware

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api', function (req, res) {
    res.send('Hello this is express server!!!');
});

app.use("/api/user", apiUserRouter);


app.listen(port, ()=>{
    console.log("hi, this is express server")
    console.log(`server started at ${port}`);
    connectDB();
})


// ERROR HANDLELING
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


//MONGO DB CONNET FUNCTION
function connectDB() {
    let db;
    mongoose.connect("mongodb://db-mongo:27017", { useNewUrlParser: true, useUnifiedTopology: true});
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
  
    db.once("open", function () {
      // we're connected!
      console.log("Connect to mongo database sucessfully");
    });
  }

