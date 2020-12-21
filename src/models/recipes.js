const db = require("../config/mySQL");
module.exports = {
  addRecipes: (insertBody) => {
    return new Promise((resolve, reject) => {
      const postQueryString = "INSERT INTO recipes SET ?";
      db.query(postQueryString, insertBody, (err, data) => {
        console.log(data);
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  getSingleRecipe: (params) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM recipes WHERE id_recipe = ${params}`;
      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  deleteRecipes: (params) => {
    return new Promise((resolve, reject) => {
      const queryString = "DELETE FROM recipes WHERE id_recipe = ?";
      db.query(queryString, [params], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
