const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/mySQL");
const sendEmail = require("../helpers/middlewares/sendEmail");

async function insertOtp(otp) {
  await db.query("INSERT INTO otp SET otp = ?", otp);
}

// async function saveId(id_user) {
//   await db.query("INSERT INTO otp SET id_user = ?", id_user);
// }

module.exports = {
  postNewUser: (body) => {
    return new Promise((resolve, reject) => {
      // if (body.name === 0) {
      //   return reject({
      //     msg: "Please input Name",
      //   });
      // } else if (body.email === 0) {
      //   return reject({
      //     msg: "Please input Email",
      //   });
      // } else if (body.phone === 0) {
      //   return reject({
      //     msg: "Please input Phone",
      //   });
      // } else if (body.password === 0) {
      //   return reject({
      //     msg: "Please input Password",
      //   });
      // }

      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(body.password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          const newBody = { ...body, password: hash };
          const qs = "INSERT INTO users SET ?";
          db.query(qs, newBody, (err, data) => {
            if (!err) {
              const payload = {
                email: body.email,
              };
              const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
              });

              resolve(
                sendEmail({
                  to: body.email,
                  subject: "Verify Account - Mama Recipe",
                  html: `<html>
                  <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                      /* FONTS */
                      @media screen {
                        @font-face {
                          font-family: "Lato";
                          font-style: normal;
                          font-weight: 400;
                          src: local("Lato Regular"), local("Lato-Regular"),
                            url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
                              format("woff");
                        }
                
                        @font-face {
                          font-family: "Lato";
                          font-style: normal;
                          font-weight: 700;
                          src: local("Lato Bold"), local("Lato-Bold"),
                            url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
                              format("woff");
                        }
                
                        @font-face {
                          font-family: "Lato";
                          font-style: italic;
                          font-weight: 400;
                          src: local("Lato Italic"), local("Lato-Italic"),
                            url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
                              format("woff");
                        }
                
                        @font-face {
                          font-family: "Lato";
                          font-style: italic;
                          font-weight: 700;
                          src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
                            url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
                              format("woff");
                        }
                      }
                
                      /* CLIENT-SPECIFIC STYLES */
                      body,
                      table,
                      td,
                      a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                      }
                      table,
                      td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                      }
                      img {
                        -ms-interpolation-mode: bicubic;
                      }
                
                      /* RESET STYLES */
                      img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                      }
                      table {
                        border-collapse: collapse !important;
                      }
                      body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                      }
                
                      /* iOS BLUE LINKS */
                      a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                      }
                
                      /* ANDROID CENTER FIX */
                      div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                      }
                    </style>
                  </head>
                  <body
                    style="
                      background-color: #f4f4f4;
                      margin: 0 !important;
                      padding: 0 !important;
                    "
                  >
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div
                      style="
                        display: none;
                        font-size: 1px;
                        color: #fefefe;
                        line-height: 1px;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        max-height: 0px;
                        max-width: 0px;
                        opacity: 0;
                        overflow: hidden;
                      "
                    >
                      Looks like you tried signing in a few too many times. Let's see if we can
                      get you back into your account.
                    </div>
                
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <!-- LOGO -->
                      <tr>
                        <td bgcolor="#f4f4f4" align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="480">
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 40px 10px 40px 10px"
                              >
                                <img
                                  alt="Logo"
                                  src="https://i.ibb.co/P9Jd4Zy/logo192.png"
                                  width="100"
                                  height="100"
                                  style="
                                    display: block;
                                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                                    color: #ffffff;
                                    font-size: 18px;
                                  "
                                  border="0"
                                />
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- HERO -->
                      <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                          <table border="0" cellpadding="0" cellspacing="0" width="480">
                            <tr>
                              <td
                                bgcolor="#ffffff"
                                align="center"
                                valign="top"
                                style="
                                  padding: 40px 20px 20px 20px;
                                  border-radius: 4px 4px 0px 0px;
                                  color: #111111;
                                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                                  font-size: 48px;
                                  font-weight: 400;
                                  letter-spacing: 4px;
                                  line-height: 48px;
                                "
                              >
                                <h1 style="font-size: 32px; font-weight: 400; margin: 0">
                                  Welcome
                                </h1>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- COPY BLOCK -->
                      <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                          <table border="0" cellpadding="0" cellspacing="0" width="480">
                            <!-- COPY -->
                            <tr>
                              <td
                                bgcolor="#ffffff"
                                align="left"
                                style="
                                  padding: 20px 30px 40px 30px;
                                  color: #666666;
                                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                                  font-size: 18px;
                                  font-weight: 400;
                                  line-height: 25px;
                                "
                              >
                                <p style="margin: 0">
                                  Thank you for register to Mama Recipe. Please click the below link to verify your email address.
                                </p>
                              </td>
                            </tr>
                            <!-- BULLETPROOF BUTTON -->
                            <tr>
                              <td bgcolor="#ffffff" align="left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td
                                      bgcolor="#ffffff"
                                      align="center"
                                      style="padding: 20px 30px 60px 30px"
                                    >
                                      <table border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                          <td
                                            align="center"
                                            style="border-radius: 3px"
                                            bgcolor="#DB3022"
                                          >
                                            <a
                                              href="${process.env.LOCAL}/auth/verify/${token}"
                                              style="
                                                font-size: 20px;
                                                font-family: Helvetica, Arial, sans-serif;
                                                color: #ffffff;
                                                text-decoration: none;
                                                color: #ffffff;
                                                text-decoration: none;
                                                padding: 15px 25px;
                                                border-radius: 2px;
                                                border: 1px solid #efc81a
                                                display: inline-block;
                                              "
                                              >Verify</a
                                            >
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                
                      <!-- COPY CALLOUT -->
                      <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                          <table border="0" cellpadding="0" cellspacing="0" width="480">
                            <!-- SUPPORT CALLOUT -->
                            <tr>
                              <td
                                bgcolor="#f4f4f4"
                                align="center"
                                style="padding: 30px 10px 0px 10px"
                              >
                                <table border="0" cellpadding="0" cellspacing="0" width="480">
                                  <!-- HEADLINE -->
                                  <tr>
                                    <td
                                      bgcolor="#C6C2ED"
                                      align="center"
                                      style="
                                        padding: 30px 30px 30px 30px;
                                        border-radius: 4px 4px 4px 4px;
                                        color: #666666;
                                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                                        font-size: 18px;
                                        font-weight: 400;
                                        line-height: 25px;
                                      "
                                    >
                                      <h2
                                        style="
                                          font-size: 20px;
                                          font-weight: 400;
                                          color: #111111;
                                          margin: 0;
                                        "
                                      >
                                        If you dit not register, please ignore this email.
                                      </h2>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <!-- PERMISSION REMINDER -->
                            <tr>
                              <td
                                bgcolor="#f4f4f4"
                                align="left"
                                style="
                                  padding: 0px 30px 30px 30px;
                                  color: #666666;
                                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                                  font-size: 14px;
                                  font-weight: 400;
                                  line-height: 18px;
                                "
                              ></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </body>
                </html>
                `,
                })
              );
            } else {
              reject(err);
            }
          });
        });
      });
    });
  },

  postLogin: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      // if (body.email == 0 || body.password == 0) {
      //   return reject({
      //     msg: "Please enter the required fields",
      //   });
      // }
      const qs =
        "SELECT id_user, email, name, user_img, isVerified, password FROM users WHERE email = ?";
      db.query(qs, email, (err, data) => {
        if (!err) {
          if (data[0]) {
            bcrypt.compare(password, data[0].password, (err, result) => {
              if (!err) {
                if (!result) {
                  reject("Wrong Password");
                } else {
                  if (data[0].isVerified !== 0) {
                    const payload = {
                      id_user: data[0].id_user,
                      name: data[0].name,
                    };
                    const token = jwt.sign(payload, process.env.SECRET_KEY);
                    resolve({
                      id_user: data[0].id_user,
                      name: data[0].name,
                      email: email,
                      user_img: data[0].user_img,
                      tokenId: token,
                    });
                  } else {
                    reject("Please verify your account first!");
                  }
                }
              } else {
                reject("Hash Error");
              }
            });
          } else {
            reject("User Not Found!");
          }
        } else {
          reject("Error Occured");
        }
      });
    });
  },
  //       if (err) {
  //         reject(
  //           "Error SQL"
  //           //   {
  //           //   msg: "Error SQL",
  //           //   status: 500,
  //           //   err,
  //           // }
  //         );
  //       }
  //       if (!data[0]) {
  //         reject(
  //           "User Not Found"
  //           //   {
  //           //   msg: "User Not Found",
  //           //   status: 404,
  //           // }
  //         );
  //       } else {
  //         bcrypt.compare(password, data[0].password, (err, result) => {
  //           if (err) {
  //             reject(
  //               "Hash Error"
  //               //   {
  //               //   msg: "Hash Error",
  //               //   status: 500,
  //               // }
  //             );
  //           }
  //           if (!result) {
  //             reject(
  //               "Wrong Password"
  //               //   {
  //               //   msg: "Wrong Password",
  //               //   status: 401,
  //               // }
  //             );
  //           } else {
  //             const payload = {
  //               id_user: data[0].id_user,
  //               name: data[0].name,
  //               email: data[0].email,
  //             };
  //             const secret = process.env.SECRET_KEY;
  //             const token = jwt.sign(payload, secret, { expiresIn: "24h" });
  //             resolve({ token });
  //           }
  //         });
  //       }
  //     });
  //   });
  // },

  postLogout: (blacklistToken) => {
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO blacklist SET ?";
      db.query(qs, blacklistToken, (err, result) => {
        if (!err) {
          resolve(
            result
            //   {
            //   msg: "Logout Success",
            // }
          );
        } else {
          reject(
            err
            //   {
            //   msg: "Logout Failed",
            // }
          );
        }
      });
    });
  },

  verify: (tokenId) => {
    const decodedToken = jwt.verify(tokenId, process.env.SECRET_KEY);
    const email = decodedToken.email;
    return new Promise((resolve, reject) => {
      const qs = "UPDATE users SET isVerified = 1 WHERE email = ?";
      db.query(qs, email, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  forgot: (body) => {
    const { email } = body;
    return new Promise((resolve, reject) => {
      const qs = "SELECT email, id_user FROM users WHERE email = ?";
      // saveId(id_user)
      db.query(qs, email, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data[0] !== 0) {
          let otp = Math.floor(100000 + Math.random() * 900000);
          insertOtp(otp);

          resolve(
            sendEmail({
              to: body.email,
              subject: "Reset Password - Mama Recipe",
              html: `<html>
              <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
                  /* FONTS */
                  @media screen {
                    @font-face {
                      font-family: "Lato";
                      font-style: normal;
                      font-weight: 400;
                      src: local("Lato Regular"), local("Lato-Regular"),
                        url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
                          format("woff");
                    }
            
                    @font-face {
                      font-family: "Lato";
                      font-style: normal;
                      font-weight: 700;
                      src: local("Lato Bold"), local("Lato-Bold"),
                        url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
                          format("woff");
                    }
            
                    @font-face {
                      font-family: "Lato";
                      font-style: italic;
                      font-weight: 400;
                      src: local("Lato Italic"), local("Lato-Italic"),
                        url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
                          format("woff");
                    }
            
                    @font-face {
                      font-family: "Lato";
                      font-style: italic;
                      font-weight: 700;
                      src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
                        url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
                          format("woff");
                    }
                  }
            
                  /* CLIENT-SPECIFIC STYLES */
                  body,
                  table,
                  td,
                  a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                  }
                  table,
                  td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  }
                  img {
                    -ms-interpolation-mode: bicubic;
                  }
            
                  /* RESET STYLES */
                  img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                  }
                  table {
                    border-collapse: collapse !important;
                  }
                  body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                  }
            
                  /* iOS BLUE LINKS */
                  a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                  }
            
                  /* ANDROID CENTER FIX */
                  div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                  }
                </style>
              </head>
              <body
                style="
                  background-color: #f4f4f4;
                  margin: 0 !important;
                  padding: 0 !important;
                "
              >
                <!-- HIDDEN PREHEADER TEXT -->
                <div
                  style="
                    display: none;
                    font-size: 1px;
                    color: #fefefe;
                    line-height: 1px;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    max-height: 0px;
                    max-width: 0px;
                    opacity: 0;
                    overflow: hidden;
                  "
                >
                  Looks like you tried signing in a few too many times. Let's see if we can
                  get you back into your account.
                </div>
            
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <!-- LOGO -->
                  <tr>
                    <td bgcolor="#f4f4f4" align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="480">
                        <tr>
                          <td
                            align="center"
                            valign="top"
                            style="padding: 40px 10px 40px 10px"
                          >
                            <img
                              alt="Logo"
                              src="https://i.ibb.co/P9Jd4Zy/logo192.png"
                              width="100"
                              height="100"
                              style="
                                display: block;
                                font-family: 'Lato', Helvetica, Arial, sans-serif;
                                color: #ffffff;
                                font-size: 18px;
                              "
                              border="0"
                            />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- HERO -->
                  <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                      <table border="0" cellpadding="0" cellspacing="0" width="480">
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="center"
                            valign="top"
                            style="
                              padding: 40px 20px 20px 20px;
                              border-radius: 4px 4px 0px 0px;
                              color: #111111;
                              font-family: 'Lato', Helvetica, Arial, sans-serif;
                              font-size: 48px;
                              font-weight: 400;
                              letter-spacing: 4px;
                              line-height: 48px;
                            "
                          >
                            <h1 style="font-size: 32px; font-weight: 400; margin: 0">
                              Here Your OTP for Reset Password
                            </h1>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- COPY BLOCK -->
                  <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                      <table border="0" cellpadding="0" cellspacing="0" width="480">
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="left"
                            style="
                              padding: 20px 30px 40px 30px;
                              color: #666666;
                              font-family: 'Lato', Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p style="margin: 0">
                              Please click the below code to reset your password
                            </p>
                          </td>
                        </tr>
                        <!-- BULLETPROOF BUTTON -->
                        <tr>
                          <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td
                                  bgcolor="#ffffff"
                                  align="center"
                                  style="padding: 20px 30px 60px 30px"
                                >
                                  <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td
                                        align="center"
                                        style="border-radius: 3px"
                                        bgcolor="#DB3022"
                                      >
                                        <a
                                          href="http://mamarecipe.site:3000/"
                                          style="
                                            font-size: 20px;
                                            font-family: Helvetica, Arial, sans-serif;
                                            color: #ffffff;
                                            text-decoration: none;
                                            color: #ffffff;
                                            text-decoration: none;
                                            padding: 15px 25px;
                                            border-radius: 2px;
                                            border: 1px solid #efc81a
                                            display: inline-block;
                                          "
                                          >${otp}</a
                                        >
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
            
                  <!-- COPY CALLOUT -->
                  <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                      <table border="0" cellpadding="0" cellspacing="0" width="480">
                        <!-- SUPPORT CALLOUT -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="center"
                            style="padding: 30px 10px 0px 10px"
                          >
                            <table border="0" cellpadding="0" cellspacing="0" width="480">
                              <!-- HEADLINE -->
                              <tr>
                                <td
                                  bgcolor="#C6C2ED"
                                  align="center"
                                  style="
                                    padding: 30px 30px 30px 30px;
                                    border-radius: 4px 4px 4px 4px;
                                    color: #666666;
                                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                                    font-size: 18px;
                                    font-weight: 400;
                                    line-height: 25px;
                                  "
                                >
                                  <h2
                                    style="
                                      font-size: 20px;
                                      font-weight: 400;
                                      color: #111111;
                                      margin: 0;
                                    "
                                  >
                                    If you dit not request reset password, please ignore this email.
                                  </h2>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- PERMISSION REMINDER -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="left"
                            style="
                              padding: 0px 30px 30px 30px;
                              color: #666666;
                              font-family: 'Lato', Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 18px;
                            "
                          ></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            `,
            })
          );
        } else {
          reject("Email Not Found");
        }
      });
    });
  },

  reset: (body) => {
    return new Promise((resolve, reject) => {
      const saltRounds = 10;
      const qs = "SELECT email FROM users WHERE email = ?";
      db.query(qs, [body.email], (err, data) => {
        if (data.length !== 0) {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
              reject("err");
            }
            const { password, email } = body;
            bcrypt.hash(password, salt, (err, hashedPassword) => {
              if (err) {
                reject("Please Input New Password");
              }
              const qs = "UPDATE users SET password = ? WHERE email = ?";
              db.query(qs, [hashedPassword, email], (err, data) => {
                if (data !== 0) {
                  resolve("Success", data);
                } else {
                  reject("Encountered Error", err);
                }
              });
            });
          });
        } else {
          reject("Either User Not Found or Error Occured");
        }
      });
    });
  },

  //       if (!err) {
  //         if (data[0]) {
  //           const payload = {
  //             email: data[0].email,
  //           };
  //           const tokenForgot = jwt.sign(payload, process.env.SECRET_KEY, {
  //             expiresIn: 1000 * 60 * 15,
  //           });
  //           resolve(`${process.env.LOCAL}/auth/reset/${tokenForgot}`);
  //         } else {
  //           reject("Email Not Found");
  //         }
  //       } else {
  //         reject("Error Occured");
  //       }
  //     });
  //   });
  // },

  sendOtp: (body) => {
    return new Promise((resolve, reject) => {
      if (body.otp == 0) {
        return reject("Please Input OTP");
      }
      const { otp } = body;
      const qs = "SELECT otp FROM otp WHERE otp = ?";
      db.query(qs, otp, (err, data) => {
        if (err) {
          reject("Error Occured");
        }
        console.log(data);
        if (data == undefined) {
          return reject("Error Occured");
        }
        if (!data[0]) {
          reject("Wrong OTP");
        } else {
          resolve(data);
        }
      });
    });
  },
};
