var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET users listing. */
const { Pool, Client } = require('pg')
const {isLoggedin} = require('../../../middleware/isLogged');

var setting = {
  uri: 'postgres://kburuxiudhihbo:0c26fc6d1a06365a5a8fe206452e3ff9fb2e12fc76531080ab1342c1dbba21c4@ec2-54-243-238-46.compute-1.amazonaws.com:5432/db2kj54elqvc21',
}
const pool = new Pool({
  connectionString: setting.uri,
  ssl: true
})

const client = new Client({
  connectionString: setting.uri,
  ssl: true,
})
client.connect()

router.get('/',isLoggedin, (req,res) => { 
  var email = req.user.email;
  pool.connect()
  .then( client => {
    return client.query("Select * from customer where email = ($1)", [email] 
    , (err,data) => {
      if (err) {
        console.log(err);
        res.json({
          error: "Wrong query!"
        })
      }
      else 
        res.json({
          profile: data.rows[0]
        })
      client.release();
    })
  })
  .catch(err => { console.log(err)})
})


router.post('/update',isLoggedin, function(req, res, next) {
  
  var profile = req.body
  pool.connect()
  .then( client => {
    return client.query("update 	customer "+
                        "set 	fullname = ($1), gender = ($2), phone = ($3), identify_card = ($4), " +
                              "address = ($5), hobby = ($6), password = ($7) "+
                        "where 	email = 'nva@gmail.com'", 
                        [profile.fullname, profile.gender, profile.phone, profile.identify_card, profile.address, profile.hobby, profile.password]
    , (err,data) => {
      if (err) {
        console.log(err);
        res.json({
          error: "Wrong query!"
        })
      }
      else 
        res.json({
          message: "Update success!",
        })
      client.release();
    })
  })
  .catch(err => { console.log(err)})
});

module.exports = router;
