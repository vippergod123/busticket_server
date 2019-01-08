var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');
var {isLoggedin} = require('../../middleware/isLogged');

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AUSTJ5xHg9N8OKQF18rNz4T2QoQgpTUZV_yZDKcWYRpJGSTwMyOLnY4dWr6skobpMrXempmxppRpumN-',
    'client_secret': 'EA7hlTZg7Kf-QfK9sU6jcWw_daHd1wQg5vb1f-PrGlVcDUOkRXaSD743p7KSYnD90KQcpouhb7pj_1QP',
})
/* GET home page. */
router.post('/paypal', function(req, res, next) {
    req.session.payment = { 
        items:null,
        total:null,
        currency:null,
    }
    var  items = [
            {
                name: "Sài Gòn - Đà Nẵng",
                sku: "A1, B2",
                price: "25.00",
                currency: "USD",
                quantity: 1
            },
        ]
    var currency = items[0].currency;
    var total = items[0].price;
    var description = "1-way trip"

    req.session.payment.items = items;
    req.session.payment.total = total;
    req.session.payment.currency = currency;
    // var items = req.body.items
    // var description = req.body.description  // description = "1-way trip"
    const paymentTransaction = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/payment/success",
            "cancel_url": "http://localhost:3000/payment/cancel"
        },
        "transactions": [{
            "item_list": {
                items,
            },
            "amount": {
                "currency": currency,
                "total": total,
            },
            "description": description
        }]
    };
    console.log(req.session);
    console.log(req.user);
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



router.post('/paypal/verify', (req, res) => {
    console.log(req.session);
    console.log(req.body);
    const PayerID = req.body.PayerID;
    const paymentId = req.body.paymentId;
  
    var currency = req.session.payment.currency;
    var total = req.session.payment.total;
    
    const execute_payment_json = {
      "payer_id": PayerID,
      "transactions": [{
          "amount": {
              "currency": currency,
              "total": total,
          }
      }]
    };
    try {
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
            } else {
                req.session.payment = null;
                res.json({
                    id: payment.id,
                    payer: payment.payer,
                    status: payment.payer.status,
                })
            }
        });
    } catch (error) {
        console.log(error);
    }
    
  });

router.get('/paypal/success', (req, res) => {
    console.log(req.session);
    console.log(req.user);
    var currency = req.session.payment.currency;
    var total = req.session.payment.total;
    var items = req.session.payment.items ;
    
    res.json({
        status: "NOT-VERIFIED",
        total: total,
        currency: currency,
        items: items,
    })
});



module.exports = router;
