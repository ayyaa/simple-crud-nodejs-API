var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/students', function(req, res, next) {
  var search, get_atr, sort;
  if (req.query.search === undefined || req.query.get_atr === undefined || req.query.sort === undefined) {
    search = '';
    get_atr = 'id_student';
    sort = 'DESC';
  } else {
    search =req.query.search;
    get_atr = req.query.get_atr;
    sort = req.query.sort;
  }
  req.getConnection(function(err, conn) {
    conn.query("SELECT * FROM student WHERE ?? LIKE CONCAT('%', ? ,'%') ORDER BY ?? "+sort, [get_atr, search, get_atr],function(error, rows, fields) {
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

router.post('/api/students/add', function(req, res, next) {
  var postData  = {
    name: req.body.name,
    address:req.body.address,
    email_student: req.body.email_student,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth
  };
  console.log(postData);
  req.getConnection(function(err, conn) {
    conn.query('INSERT INTO student SET ?', postData, function (error, results, fields) {
      console.log(postData);
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

router.get('/api/students/update/:id', function(req, res, next) {
  req.getConnection(function(err, conn) {
    conn.query('SELECT * FROM student WHERE id_student = ?', [req.params.id], function(error, rows, fields) {
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

router.put('/api/students/update/:id', function(req, res, next) {
  var atrStudent = {
    id_student: req.body.id_student,
    name: req.body.name,
    address:req.body.address,
    email_student: req.body.email_student,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth
  };
  req.getConnection(function(err, conn) {
    conn.query('UPDATE student SET ? WHERE id_student = ?', [atrStudent, req.params.id], function (error, results, fields) {
      console.log(atrStudent);
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

router.delete('/api/students/delete/:id', function(req, res, next) {
  req.getConnection(function(err, conn) {
    conn.query('DELETE FROM student WHERE id_student = ?', [req.params.id], function(error, rows, fields) {
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

module.exports = router;
