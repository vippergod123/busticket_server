var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET users listing. */
const { Pool, Client } = require('pg')


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


router.post('/', function(req, res, next) {
  var profile = req.body
  pool.connect()
  .then( client => {
    return client.query("INSERT INTO customer (email, fullname,gender,phone,identify_card,address,hobby,password) "+
                        "VALUES ( ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8))",
                        [profile.email, profile.fullname, profile.gender, profile.phone, profile.identity_card, profile.address, profile.hobby, profile.password]
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


