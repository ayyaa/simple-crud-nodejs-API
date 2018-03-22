var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../config/config');

router.get('/user/users', function(req, res, next) {
	// Make a request for a user with a given ID
	axios.get(config.server.host+'/api/users')
	.then(function (response) {
    console.log(response);
		res.render('user_list', {title: 'User List', data: response.data.data});
	})
	.catch(function (error) {
		console.log(error);
	});
});

router.post('/user/add', function(req, res, next) {
	axios.post(config.server.host+'/api/users/add', {
    user: req.body.user,
    email: req.body.email,
    password: req.body.password
  })
  .then(function (response) {
		console.log(response);
		if(response.data.status === 200) {
			res.redirect('/user/users');
		}
  })
  .catch(function (error) {
    console.log(error);
  });
});

module.exports = router;
