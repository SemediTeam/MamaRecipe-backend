const { EMAIL, EPASS, FROM } = process.env

module.exports = {
  emailFrom: FROM,
  smtpOptions: {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: EMAIL,
      pass: EPASS
    }
  }
}
