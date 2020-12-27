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
                  html: `<h4>Verify Email</h4>
                           <p>Thanks for registering!</p>
                           <p>Please click the below link to verify your email address:</p>
                <p><a href="${process.env.LOCAL}/auth/verify/${token}">${process.env.LOCAL}/auth/verify/${token}</a></p>`,
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
        if (data.length !== 0) {
          let otp = Math.floor(100000 + Math.random() * 900000);
          insertOtp(otp);

          resolve(
            sendEmail({
              to: body.email,
              subject: "Reset Password Mama Recipe",
              html: `<h4>Reset Password</h4>
                     <p>Here Your OTP for Reset Password</p>
                     <p style="font-weight: bold;">${otp}<p>
                     <p>Please click the below link to reset your password</p>
          <p><a href="${process.env.LOCAL}/auth/otp/">${process.env.LOCAL}/auth/otp/</a></p>`,
            })
          );
        } else {
          reject("Email Not Found");
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
  //           resolve({
  //             status: 200,
  //             email: email,
  //             message: `${process.env.HOSTNAME}/auth/reset/${tokenForgot}`,
  //           });
  //         } else {
  //           reject("Email Not Found");
  //         }
  //       } else {
  //         reject("Error Occured");
  //       }
  //     });
  //   });
  // },

 
};
