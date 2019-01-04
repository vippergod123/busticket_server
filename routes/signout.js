var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.logout();
    return res.json({
        message: "Sign out success!",
        redirect: "/signin"
    })
});

module.exports = router;
