var Passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  crypto = require('crypto-js')

  
const { Pool, Client } = require('pg');

var customer;
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

pool.connect()
.then( client => {
    return client.query('SELECT * From customer', (err,data) => {
    customer = data.rows;
    client.release();
    })
})
.catch(err => { console.log(err)})


//sua
Passport.use(new LocalStrategy(
  (username, password, done) => {

    var authUser = customer.find( x => x.email === username && x.password === password)
    if (authUser) { 
        return done(null,authUser)
    }
    else { 
        return done(null,false)
    }
  }
)) // MongoClient

Passport.serializeUser((user, done) => {
  done(null, user)
})
Passport.deserializeUser((id, done) => {
    done(null,id)
});


module.exports = Passport;