const db = require("../config/mySQL");

module.exports = {
  getUserById: (req) => {
    return new Promise((resolve, reject) => {
      const qs =
        "SELECT id_user, name, email, phone, user_img FROM users WHERE id_user = ?";
      db.query(qs, req, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  updateUser: (id, updateBody) => {
    return new Promise((resolve, reject) => {
      const qs = "UPDATE users SET ? WHERE id_user = ?";
      db.query(qs, [id, updateBody], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  // updateUserImg: (body) => {
  //   const { user_img } = body;
  //   return new Promise((resolve, reject) => {
  //     const qs = "UPDATE users SET user_img = ? WHERE id_user = ?";
  //     db.query(qs, user_img, (err, data) => {
  //       if (!err) {
  //         resolve(data);
  //       } else {
  //         reject(err);
  //       }
  //     });
  //   });
  // },
};
