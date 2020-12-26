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
  getRecipeLike: (req) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      const queryString =
        "SELECT a.recipe_name, a.recipe_img FROM recipes as a JOIN likes as s ON s.id_recipe=a.id_recipe WHERE s.id_user=?";
      db.query(queryString, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
