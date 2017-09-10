const express = require('express');
const User = require('../model/user');
const privateRoutes = express.Router();


privateRoutes.use((req, res, next) => {
  if (req.session.currentUser) {

  	const user = req.session.currentUser;
  	const userId = req.session.currentUser._id;
  	res.render('private', {
      title: 'User page', 
      user: user
    })
	
  } else {
    res.redirect("/");
  }
});


privateRoutes.post('/', (req, res, next) => {
    User.findById(userId, (err, user) => {
        res.render('private');
        if (err) { return next(err) }
        console.log('USER', user)
        res.render('private', { title: 'Edit profile', user: user })
    })

});


module.exports = privateRoutes;

