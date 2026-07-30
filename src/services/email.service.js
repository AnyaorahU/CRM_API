const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP server is ready");
  }
});

async function sendOTPEmail({ email, otp }) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Please verify your Email",
    text: `Hello, 
    welcome to our application,Your OTP is:
     ${otp},
    it expires in 5 minutes, dont share with any one, 
    if you are not the one that send it, please kindly ignore. 
    Regards from the support team`,
  });
}

module.exports = { sendOTPEmail };
