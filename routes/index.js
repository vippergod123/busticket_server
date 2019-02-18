var express = require('express');
var router = express.Router();


var fs = require('fs');
var obj;

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  fs.readFile('file.txt', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      res.json({
        message: "Failed",
      }) 
    }
    else {
      obj = JSON.parse(data);
      res.json(obj)
    }
  });

});

module.exports = router;
