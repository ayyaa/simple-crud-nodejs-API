
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config/config');
const moment = require('moment');

router.get('/student/students', function(req, res, next) {
	axios.get(config.server.host+'/api/students/', {
    params: {
      search: req.query.search,
      get_atr: req.query.get_atr,
      sort: req.query.sort
    }
  })
	.then(function (response) {
    console.log(response);
    // var notif, notif2;
    // var number = response.data.data.length;
    // if (number === 0) {
    //   notif = 'data "'+search+'" from "'+get_atr+'" not found';
    // } else {
    //   notif2 = 'found '+number+' data based on character "'+search+'" from column "'+get_atr+'"';
    // }
		res.render('index', {title: 'Student List', data: response.data.data});
	})
	.catch(function (error) {
		console.log(error);
	});
});

router.get('/student/add', function(req, res, next) {
  // Render index.pug page using array 
  res.render('form_add_student', {title: 'Add Student'});
});

router.post('/student/add', function(req, res, next) {
	axios.post(config.server.host+'/api/students/add', {
    name: req.body.name,
    address:req.body.address,
    email_student: req.body.email_student,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth
  })
  .then(function (response) {
		console.log(response);
		if(response.data.status === 200) {
			res.redirect('/student/students');
		}
  })
  .catch(function (error) {
    console.log(error);
  });
});

router.get('/student/:id', function(req, res){
  axios.get(config.server.host+'/api/students/update/'+req.params.id, {
    id_student: req.params.id
  }) 
	.then(function (response) {
    console.log(response);
    console.log(req.params.id)
		res.render('update_student', {
      title: 'Update Student',
      val_id_student: response.data.data[0].id_student,
      val_name: response.data.data[0].name,
      val_address: response.data.data[0].address,
      val_gender: response.data.data[0].gender,
      val_email_student: response.data.data[0].email_student,
      val_birth_of_date: moment(response.data.data[0].date_of_birth).format('YYYY-MM-DD')
    });
	})
	.catch(function (error) {
		console.log(error);
	});
});

router.post('/student/add_update', function(req, res) {
  axios.put(config.server.host+'/api/students/update/'+req.body.id_student, {
    id_student: req.body.id_student,
    name: req.body.name,
    address:req.body.address,
    email_student: req.body.email_student,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth
  })
  .then(function (response) {
		console.log(response);
		if(response.data.status === 200) {
			res.redirect('/student/students');
		}
  })
  .catch(function (error) {
    console.log(error);
  });
});

router.post('/delete/:id', function(req, res) {
  axios.delete(config.server.host+'/api/students/delete/'+req.params.id)
  .then(function (response) {
		console.log(response);
		if(response.data.status === 200) {
			res.redirect('/student/students');
		}
  })
  .catch(function (error) {
    console.log(error);
  });
});

module.exports = router;