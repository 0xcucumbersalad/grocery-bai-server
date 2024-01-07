const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "codahackeronetest@gmail.com",
    pass: "VYzaPry93Nt7kmqG",
  },
  tls: {
    ciphers: 'SSLv3'
  }
});


async function OTP(email, otp) {
  try {
     const info = await transporter.sendMail({
          from: '"Grocery Bai " <help@grocerybai.com>', // sender address
          to: email, // list of receivers
          subject: "GroceryBai Reset Password Request", // Subject line
          text: "Reset Password", // plain text body
          html: `Hi, to complete the password reset process, please use the One Time Password (OTP) Here: ${otp}`, // html body
        });
      
      return info
  } catch (error) {
     console.log(error)
  }
}

module.exports = { OTP }
