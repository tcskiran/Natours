const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');
const sgMail = require('@sendgrid/mail');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    // this.from = `Kiran TCS <${process.env.EMAIL_FROM}>`;
    this.from = `tcskiran22@gmail.com`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      // Given--------
      // return nodemailer.createTransport({
      //   service: 'SendGrid',
      //   auth: {
      //     user: process.env.SENDGRID_USERNAME,
      //     pass: process.env.SENDGRID_PASSWORD,
      //   },
      // });
      // Test-1-------
      // return nodemailer.createTransport(
      //   nodemailerSendgrid({
      //     apiKey: process.env.SENDGRID_PASSWORD,
      //   })
      // );
      sgMail.setApiKey(process.env.SENDGRID_PASSWORD);
      return sgMail;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // Render HTML based on pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };
    // Create a transport and send email
    // await this.newTransport().sendMail(mailOptions);
    await this.newTransport().send(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to this great community');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token valid for 10min'
    );
  }
};
