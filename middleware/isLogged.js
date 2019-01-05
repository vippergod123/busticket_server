function isLoggedin(req, res, next) {  
    if (!req.user) {
      res.json({
        error: "You not sign in yet!",
        redirect: "/signin",
      })
    }  
    else {
      return next()
    }  
    
 }

 module.exports.isLoggedin = isLoggedin