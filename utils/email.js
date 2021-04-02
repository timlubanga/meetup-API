const nodemailer = require('nodemailer');
const pug = require('pug');

// const sendEmail = async (options) => {
//   //create a transporter
//   const transporter = nodemailer.createTransport({
//     service: process.env.SERVICE,
//     auth: {
//       user: process.env.USERNAME,
//       pass: process.env.PASSWORD,
//     },
//   });

//   //define email options
//   const mailOptions = {
//     from: 'timothylubs<nodemailer.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     html: `<h1>Good morning all of you</h1>`,
//   };

//   //actually send the mail

// //   return await transporter.sendMail(mailOptions);
// // };

// module.exports = sendEmail;

class Email {
  constructor(recepient, subject) {
    this.from = 'timothylubs@Admin<nodemailer.com>';
    this.recepient = recepient;
    this.subject = subject;
  }

  sendEmailTo(template) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'expertwriterz.inc@gmail.com',
        pass: 'husna1991',
      },
    });
    const mailOptions = {
      from: this.from,
      to: this.recepient,
      subject: this.subject,
      html: template,
    };

    return transporter
      .sendMail(mailOptions)
      .then((res) => {
        console.log('the message was sent successfully');
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  sendResetPasswordToken(name, message) {
    const template = pug.compileFile('meetupfrontend/public/templates/resetPassword.pug')({
      name: name,
      message: message,
    });
    return this.sendEmailTo(template);
  }

  sendSuccessRegistration(name) {
    const template = pug.compileFile('meetupfrontend/public/templates/welcome.pug')({
      name: name,
    });
    return this.sendEmailTo(template);
  }
}

module.exports = Email;
