var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');


paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AUSTJ5xHg9N8OKQF18rNz4T2QoQgpTUZV_yZDKcWYRpJGSTwMyOLnY4dWr6skobpMrXempmxppRpumN-',
    'client_secret': 'EA7hlTZg7Kf-QfK9sU6jcWw_daHd1wQg5vb1f-PrGlVcDUOkRXaSD743p7KSYnD90KQcpouhb7pj_1QP',
})
/* GET home page. */
router.post('/', function(req, res, next) {
    const paymentTransaction = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Hat for the best team ever"
        }]
    };

  paypal.payment.create(paymentTransaction, (err, payment) => { 
      if ( err ) { 
          console.log(err);
          
      }
      else { 
          for (let i = 0; i < payment.links.length; i++) {
              if(payment.links[i].rel === "approval_url") { 
                  console.log(payment.links[i].href);
                  
                  res.json({
                      message: "Success",
                      redirect: payment.links[i].href,
                  })
              }
              
          }
          
      }
  })
});



router.get('/success', (req, res) => {
    const payerId = "XVEX9NLSJ866E";
    const paymentId = "PAY-01W983347M7133106LQXUNCQ";
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  });

router.get('/success', (req,res) => { 
    // const paymentID = req.query.PayerID;
    // const paymentID = req.query.paymentID;
})
module.exports = router;
