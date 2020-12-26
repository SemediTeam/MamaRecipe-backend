const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/mySQL");

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
      // if (body.email == 0 || body.password == 0) {
      //   return reject({
      //     msg: "Please enter the required fields",
      //   });
      // }
      const qs = "SELECT id_user, password FROM users WHERE email = ?";
      db.query(qs, email, (err, data) => {
        if (err) {
          reject(
            "Error SQL"
            //   {
            //   msg: "Error SQL",
            //   status: 500,
            //   err,
            // }
          );
        }
        if (!data[0]) {
          reject(
            "User Not Found"
            //   {
            //   msg: "User Not Found",
            //   status: 404,
            // }
          );
        } else {
          bcrypt.compare(password, data[0].password, (err, result) => {
            if (err) {
              reject(
                "Hash Error"
                //   {
                //   msg: "Hash Error",
                //   status: 500,
                // }
              );
            }
            if (!result) {
              reject(
                "Wrong Password"
                //   {
                //   msg: "Wrong Password",
                //   status: 401,
                // }
              );
            } else {
              const payload = {
                id_user: data[0].id_user,
                name: data[0].name,
                email: data[0].email,
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
};
