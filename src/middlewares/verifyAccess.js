const jwt = require("jsonwebtoken");
const db = require("../config/mySQL");
const form = require("../helper/form.helper");

module.exports = {
  isRegistered: (req, res, next) => {
    const { email } = req.body;
    return new Promise((resolve, reject) => {
      const qs = "SELECT email FROM users WHERE email = ?";
      db.query(qs, email, (err, data) => {
        if (!err) {
          if (!data[0]) {
            resolve({
              msg: `Success`,
            });
          } else {
            reject({
              msg: `Email already in use!`,
            });
          }
        } else {
          reject({
            msg: `Error`,
          });
        }
      });
    })
      .then(() => {
        next();
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  isLogin: (req, res, next) => {
    const bearerToken = req.header("x-access-token");
    if (!bearerToken) {
      form.error(res, {
        msg: "Please Login First",
        status: 401,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      return new Promise((resolve, reject) => {
        const qs = `SELECT token FROM blacklist WHERE token = ?`;
        db.query(qs, token, (err, data) => {
          if (!err) {
            if (!data[0]) {
              resolve(token);
            } else {
              reject({
                msg: `Invalid Token, either you not login yet or already logout`,
              });
            }
          } else {
            reject({
              msg: `Check Token Error`,
            });
          }
        });
      })
        .then((result) => {
          try {
            decodedToken = jwt.verify(result, process.env.SECRET_KEY);
            req.decodedToken = decodedToken;
            next();
          } catch (err) {
            form.error(res, {
              msg: "Invalid Token",
              status: 401,
              err,
            });
          }
        })
        .catch((err) => {
          form.error(res, err);
        });
    }
  },
};
