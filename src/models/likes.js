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
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  getRecipeLike: (id_users) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT br.id, r.id_recipe, r.recipe_name, r.recipe_img, r.recipe_desc, r.recipe_ingredients FROM likes AS br JOIN recipes AS r ON br.id_recipe = r.id_recipe WHERE br.id_user = ?`;
      db.query(queryString, id_users, (err, data) => {
        if (!err) {
          if (data.length) {
            resolve({
              status: 200,
              message: `Like`,
              data: data,
            });
          } else {
            reject({
              status: 404,
              message: `Kamu belum memberi like`,
              data: `Data not Found`,
            });
          }
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err,
          });
        }
      });
    });
  },
  deleteLikeRecipe: (id_user, id_recipe) => {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE FROM likes WHERE id_user = ? AND id_recipe = ?`;
      db.query(queryString, [id_user, id_recipe], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
