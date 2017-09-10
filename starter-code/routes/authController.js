const express = require("express");
const User = require('../model/user');
const bcrypt = require("bcryptjs");
const authController = express.Router();
const bcryptSalt = 10;

//Sign Up
authController.get("/signup", (req, res, next) => {
    res.render("auth/signup", { "title": "Sign Up"});
});

authController.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    // const email = req.body.email;
    // const name = req.body.name;

    if (username === "" || password === "") {
        return res.render("auth/signup", {
            message: "Indicate a username and a password to sign up"
        });
    }

    User.findOne({ "username": username },
    "username",
    (err, user) => {
        if (user !== null) {
            res.render("auth/signup", {
            message: "The username already exists"
            });
            return;
        }

        var salt = bcrypt.genSaltSync(bcryptSalt);
        var hashPass = bcrypt.hashSync(password, salt);

        var newUser = User({
            username: username,
            password: hashPass,
            name: undefined,
            email: undefined, 
            summary: undefined,
            imageUrl: undefined,
            company: undefined,
            jobTitle: undefined
        });

        newUser.save((err) => {
            if (err) {
            res.render("/auth/signup", {
                message: "Something went wrong"
            });
            } else {
                req.session.currentUser = newUser;
        		res.redirect('/private');
            }
        });
    });
});

//Sign In
authController.get("/signin", (req, res, next) => {
  if (req.session.currentUser) { res.redirect("/")
  } else {
  	res.render("auth/signin");
  }
});

authController.post("/signin", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signin", {
      message: "Indicate a username and a password to log in"
    });
    return;
  }

  User.findOne({ "username": username },
    "_id username password following",
    (err, user) => {
      if (err || !user) {
        res.render("auth/signin", {
          message: "The username doesn't exist"
        });
        return;
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.currentUser = user;
          res.redirect('/private');
        } else {
          res.render("auth/signin", {
            message: "Incorrect password"
          });
        }
      }
  });
});

//Log Out
authController.get("/logout", (req, res, next) => {
  if (!req.session.currentUser) { res.redirect("/"); return; }

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/signin");
    }
  });
});

module.exports = authController;