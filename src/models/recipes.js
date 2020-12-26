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

  getAllRecipe: () => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM recipes`;
      db.query(queryString, (err, data) => {
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
  updateRecipes: (req, params) => {
    return new Promise((resolve, reject) => {
      const queryString = "UPDATE recipes SET ? WHERE id_recipe = " + params;

      db.query(queryString, req, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  getAllRecipesNew: () => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT id_recipe, recipe_name, recipe_img FROM recipes ORDER BY created_at DESC`;
      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  getAllRecipesPopular: () => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT tr.id_recipe, tr.recipe_name, IFNULL(rl.likes, 0) as count_likes FROM recipes tr LEFT JOIN (SELECT id_recipe, count(id_recipe) as 'likes' FROM likes GROUP BY id_recipe) rl ON tr.id_recipe = rl.id_recipe ORDER BY count_likes DESC LIMIT 6 OFFSET 0`;
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
