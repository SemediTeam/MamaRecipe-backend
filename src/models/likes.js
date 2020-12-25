const db = require("../config/mySQL");

module.exports = {
  postLike: (body) => {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO likes SET ?`;
      db.query(queryString, body, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
