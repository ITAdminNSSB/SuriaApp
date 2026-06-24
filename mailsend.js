// send an Email from NODEJS Server using nodemailer module
//This tutorial will show you how to use your Gmail account to send an email:

var nodejsmailer  = require('nodemailer'); // use mailer nodejs module

var mailOptions ={
    from:'---from---@gmail.com',
    to:'----to----@gmail.com',
    subject:"Sending Email to Rajat",
    text:"Welcome to NodeMailer, It's Working",
    html: '<h1>Welcome</h1><p>That was easy!</p>',
    attachments: [
        { filename: 'txt.txt', path: './txt.txt' }
     ]
}    // details of to send from, to,  subject, text(message),


var transporter = nodejsmailer.createTransport({
    service:'gmail',
    auth:{
        user: "namicohsuria18@gmail.com",
        pass: "uxhk beyy zldu llfm", // Replace with 16-character app password
    }
}); // initialize create Transport service

//sends the mail
transporter.sendMail(mailOptions,function(error,info){

     if(error){
         console.log(error);
     }else{
         console.log('Email Send ' + info.response);
     }
});