var express = require('express');
var router = express.Router();
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


router.get('/getAll', function(req, res, next) {
    pool.connect()
    .then( client => {
      return client.query('SELECT * From customer', (err,data) => {
        if (!data) 
          res.json({
            error: "Wrong query!"
          })
        else 
          res.json({
            data: data.rows,
          })
        client.release();
      })
    })
    .catch(err => { console.log(err)})
});

module.exports = router