const express = require("express");
const User = require("./userModel");
const nodemailer = require("nodemailer");

const MAIL_HOST = "smtp.c1.liara.email";
const MAIL_PORT = 587;
const MAIL_USER = "musing_black_uqa9od";
const MAIL_PASSWORD = "829162f2-0ef5-402e-9be2-19c7b978ef30";

const router = express.Router();

router.post("/signup", function (req, res) {
  const { name, email, username, password, confirmPassword } = req.body;

  // ذخیره اطلاعات کاربر
  const newUser = new User({
    name,
    email,
    username,
    password
  });

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    tls: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    }
  });

  transporter.sendMail({
    from: 'welcome@alinajmabadi.ir',
    to: email,
    subject: 'Test Email Subject',
    html: '<h1>Example HTML Message Body</h1>'
  })
  .then(() => console.log('OK, Email has been sent.'))
  .catch(console.error);

  newUser.save(function(err) {
    if (err) {
      console.log(err);
      // اطلاعات ذخیره نشد
      res.redirect("/signup"); // یا هر مسیر دلخواه دیگر
    } else {
      console.log("User saved successfully.");
      res.redirect("/"); // یا هر مسیر دلخواه دیگر
    }
  });
});

module.exports = router;
