var express = require('express');
var router = express.Router();
const config = require('../config/config')
/* GET home page. */
router.get('/api/users', function(req, res, next) {
  req.getConnection(function(err, conn) {
    conn.query('SELECT * FROM user', function(error, rows, fields) {
      if (error) {
        res.send(JSON.stringify({
          "status": 500,
          "error": error
        }));
      } else {
        res.send(JSON.stringify({
          "status": 200,
          "data": rows
        }));
      }
    });
  }) 
});

router.post('/api/users/add', function(req, res, next) {
  var user = req.body.user;
  var email = req.body.email;
  var password = config.salt.value+''+req.body.password;
  req.getConnection(function(err, conn) {
    conn.query('INSERT INTO user (user, password, email) VALUES (?, sha1(?), ?)', [user, password, email], function (error, results, fields) {
      if (error) {
        res.send(JSON.stringify({
          "status": 500,
          "error": error
        }));
      } else {
        res.send(JSON.stringify({
          "status": 200,
          "data": results
        }));
      }
    });
    
  }) 
});


module.exports = router;
