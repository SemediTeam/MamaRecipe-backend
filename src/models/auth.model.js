const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/mySQL");

module.exports = {
  postNewUser: (body) => {
    return new Promise((resolve, reject) => {
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
              resolve(data);
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
      const qs = "SELECT password FROM users WHERE email = ?";
      db.query(qs, email, (err, data) => {
        if (err) {
          reject({
            msg: "Error SQL",
            status: 500,
            err,
          });
        }
        if (!data[0]) {
          reject({
            msg: "User Not Found",
            status: 404,
          });
        } else {
          bcrypt.compare(password, data[0].password, (err, result) => {
            if (err) {
              reject({
                msg: "Hash Error",
                status: 500,
                err,
              });
            }
            if (!result) {
              reject({
                msg: "Wrong Password",
                status: 401,
              });
            } else {
              const payload = {
                email,
              };
              const secret = process.env.SECRET_KEY;
              const token = jwt.sign(payload, secret, { expiresIn: "24h" });
              resolve({ token });
            }
          });
        }
      });
    });
  },

  postLogout: (blacklistToken) => {
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO blacklist SET ?";
      db.query(qs, blacklistToken, (err) => {
        if (!err) {
          resolve({
            msg: `Logout Success`,
          });
        } else {
          reject({
            msg: `Logout Failed`,
          });
        }
      });
    });
  },
};
