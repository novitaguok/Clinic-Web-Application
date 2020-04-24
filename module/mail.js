const nodemailer = require('nodemailer');
require('dotenv').config

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kliniktongfang17@gmail.com',
    pass: process.env.password
  }
});


function sendMail(receiver, condition) {
  let mailOptions
  if(condition=='pasien'){
    mailOptions = {
      from: 'kliniktongfang17@gmail.com',
      to: receiver,
      subject: 'Pasien Membutuhkan Anda',
      text: 'Ada pasien baru yang membutuhkan bantuan, mari kita bantu dia dengan sepenuh hati :)'
    };
  }else{
    mailOptions = {
      from: 'kliniktongfang17@gmail.com',
      to: receiver,
      subject: 'Dokter Menjawab',
      text: 'Dokter kamu sudah menjawab semua keluhan kamu, silahkan cek di website untuk mengetahui apa yang sedang kamu alami'
    };
  }
 
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendMail
}