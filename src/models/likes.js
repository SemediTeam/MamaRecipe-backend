const db = require("../config/mySQL");

module.exports = {
  postLike: (id_user, id_recipe) => {
    const body = {
      id_user: id_user,
      id_recipe: id_recipe,
    };
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO likes SET ?`;
      db.query(queryString, body, (err, data) => {
        if (!err) {
          // if (body.id_user === ) {
            
          // }
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
