var nodemailer = require ('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: 'trip.planner',
    api_key: 'cobracommander1'
  }
}

var client = nodemailer.createTransport(sgTransport(options));

var email = {
  from: '"Marco Polo" <trip.planner.co@gmail.com>',
  to: 'tcookson0805@gmail.com',
  subject: 'Hello',
  text: 'Hello world',
  html: '<b>Hello World</b>'
}

client.sendMail(email, function(err, info){
    if (err ){
      console.log(error);
    }
    else {
      console.log('Message sent: ' + info.response);
    }
});












var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: 'trip.planner.co@gmail.com',
      clientId: '{Client ID}',
      clientSecret: '{Client Secret}',
      refreshToken: '{refresh-token}',
      accessToken: '{cached access token}'
    })
  }
});

// The correct OAuth2 scope for Gmail is "https://mail.google.com/", make sure your client has this scope set

xoauth2gen.getToken(function(err, token){
    if(err){
        return console.log(err);
    }
    console.log("AUTH XOAUTH2 " + token);
});


var mailOptions = {
  from: '"Marco Polo" <trip.planner.co@gmail.com>',
  to: 'tcookson0805@gmail.com',
  subject: 'Hello',
  text: 'Hello world',
  html: '<b>Hello World</b>'
}

transporter.sendMail(mailOptions, function(error, info){
  if(error){
    return console.log('error', error)
  }
  console.log('Message sent: ' + info.response)
})
