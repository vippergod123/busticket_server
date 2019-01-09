var express = require("express"),
  router = express.Router(),
  Passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy

// function isLoggedin(req, res, next) {
//   if (req.user) {
//     return next();
//   } else {
//     // res.redirect('/login'); 
//     // res.json
//   }
// }

// Middleware

router.post('/', function(req, res, next) {
/* look at the 2nd parameter to the below call */
    Passport.authenticate('local', function(err, user, info) {
    
        var isValid = false
        isValid = user?true:false
        isValid = err?false:true

        req.logIn(user, function (err) { 
            console.log(err);
            
            isValid= user?true:false
            isValid = err?false:true
        })
        if (isValid) { 
            return res.status(200).json({
                message: "Login Success!",
                redirect: "/",
                authProfile: user,
            })
        }
        else { 
            return res.json({
                error: "Invalid email",
                redirect: "/signin",
            })
        }

    })(req, res, next);
});

module.exports = router;
