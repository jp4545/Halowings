'use strict';
var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
var bodyParser = require('body-parser');
var apiRoutes = express.Router();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// for parsing application/x-www-form-urlencoded
  var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "prakashj1998@gmail.com",
        pass: "LakshmiLakshmi1998."
    }
    });



module.exports = function(server) {
  var rand,mailOptions,host,link,sess;
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/a', server.loopback.status());
  //Send mail verification
  router.get('/send',function(req,res){
      var email = req.query.email;
      console.log(email);
  		console.log("Request for mail verification has been sent");
      rand=Math.floor((Math.random() * 1000) + 54);
      console.log("Rand: "+rand);
      host=req.get('host');
      link="http://"+req.get('host')+"/verify ?id="+rand;
      mailOptions={
        to : email,
        subject : "Please confirm your Email account",
        html : "Hello "+email+" <br>Your OTP is "+rand
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
            console.log("No mail sent");
            res.end("Fail");

        
     }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
      
       }
});
});
  router.get('/otpcheck',function(req,res){
    var otp = req.query.otp;
    if(otp == rand)
    {
      console.log("Mail Verified");
      res.end("verified");
    }
    else
    {
      console.log("Mail not verified");
      res.end("notverified");
    }
  });

  server.use(router);
};
