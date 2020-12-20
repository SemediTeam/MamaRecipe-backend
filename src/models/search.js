const db = require("../config/mySQL");

module.exports = {
  searchRecipes: (keyword) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM recipes WHERE recipes.recipe_name LIKE "%${keyword}%"`;
      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
