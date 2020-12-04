const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//프로미스 중첩에 빠지지 않도록 도와줌

let User = require("../../models/users");

/* POST user sign up. */
router.post("/signup", function (req, res, next) {
  console.log("api user sign-up");
  const post = req.body;
  //JSON Parse
  const user = JSON.parse(post);
  //value from client
  const id = user.id;
  const name = user.name;
  const pwd = user.pwd;
  const status = user.status;

  console.log("User is added");
  let newUser = new User({ id: id, name: name, pwd: pwd });
  newUser
    .save()
    .then((user) => {
      console.log(user);
      res.json({ message: "user Created Successfully", status: 2 });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "user was not Created Successfully",
        status: 91,
        err: err,
      });
    });
});

/* POST user login . */
router.post("/login", function (req, res, next) {
  console.log("api user login");
  var post = req.body;
  //JSON Parse
  const user = JSON.parse(post);
  //value from client
  const id = user.id;
  const pwd = user.pwd;
  const status = user.status;

  console.log(post);
  console.log(JSON.parse(post));

  console.log(id);
  console.log(pwd);
  console.log(status);

  console.log("User is find");

  User.findOne({ id: id }, function (err, user) {
    if (err) return res.json({ error: err, status: 99 });
    if (!user) return res.json({ error: "user was not found", status: 91 });

    if (user) {
      User.find({ id: id })
        .then((result) => {
          for (i in result) {
            if (result[i].id === id) {
              console.log("Login try result[i].id");
              if (result[i].pwd === pwd) {
                console.log("user password is correct and login success");
                res.json({
                  id: result[i].id,
                  name: result[i].name,
                  message: "user password is correct and login success",
                  status: 2,
                });
              } else {
                console.log("user password is not correct");
                res.json({
                  message: "user password is not correct",
                  status: 92,
                });
              }
            } else if (result[i].id === null) {
              console.log("user ID is not existed");
              res.json({ message: "user ID is not existed", status: 91 });
            }
          }
        })

        .catch((err) => {
          return res.json({ error: err, status: 99 });
        });
    }
  });
});

module.exports = router;