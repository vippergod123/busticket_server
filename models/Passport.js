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
    // console.log(crypto.SHA256(password).toString());
    var authUser = customer.find( x => x.email === username && x.password === password)
    if (authUser) { 
        return done(null,authUser)
    }
    else { 
        return done(null,null)
    }
    // if (username[0] != 's') {
    // //   customer.customerCollection(function(result) {
    //     // temp = result;

    //     // var user = temp.filter(x => x.ID === username);

    //     // if (!user[0]) {
    //     //   return done(null, false);
    //     // }
    //     // if (user[0].password != password) {//user[0] là database password là trên ejs
    //     //   return done(null, false)
    //     // }
    //     return done(null, user[0]);
    // //   });
  }
)) // MongoClient

Passport.serializeUser((user, done) => {

  done(null, user.ID)
})
Passport.deserializeUser((id, done) => {

//   var myVar = "ID";
//   var params = {};
//   params[myVar] = id;
//   MongoClient.connect(uri, function(err, db) {
//     if (err) throw err;
//     if (id[0] != 's') {
//       var dbo = db.db("3dwebsite");
//       dbo.collection("customer").find(params).toArray(function(err, result) {
//         var bytes = crypto.AES.decrypt(result[0].password,'dudada');
//         pass = bytes.toString(crypto.enc.Utf8);
//         result[0].password = pass;
//         pass = null;
//         done(err, result[0]);
//       });
//     } else if (id[0] == 's') {
//       var dbo = db.db("3dwebsite");
//       dbo.collection("staff").find(params).toArray(function(err, result) {
//         var bytes = crypto.AES.decrypt(result[0].password,'dudada');
//         pass = bytes.toString(crypto.enc.Utf8);
//         result[0].password = pass;
//         pass = null;
//         done(err, result[0]);

//       });
//     }
//     db.close();
//   });
    console.log(id);

    done(null,id)
});


module.exports = Passport;