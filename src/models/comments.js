const db = require("../config/mySQL");
const form = require("../helpers/form");

module.exports = {
  addComment: (id_user, id_recipe, comment) => {
    const body = {
      id_user: id_user,
      id_recipe: id_recipe,
      comment: comment,
    };
    return new Promise((resolve, reject) => {
      const queyString = "INSERT INTO comment SET ?";
      db.query(queyString, body, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            msg: `${comment}`,
          });
        } else {
          reject({
            status: 500,
            msg: err,
          });
        }
      });
    });
  },

  getComment: (recipeId) => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT r.id_recipe, r.recipe_name, u.name, c.id_user, c.id_recipe, c.comment, c.created_at FROM comment AS c JOIN users AS u ON u.id_user = c.id_user JOIN recipes AS r ON r.id_recipe = c.id_recipe WHERE c.id_recipe = ?`;
      db.query(queryString, recipeId, (err, data) => {
        if (!err) {
          if (data.length) {
            resolve({
              recipeId: data[0].id_recipe,
              recipe_name: data[0].recipe_name,
              data: data,
            });
          } else {
            reject({
              data: "Nothing comment, recipe not found",
            });
          }
        } else {
          reject({
            status: 500,
            msg: `Error`,
            details: err,
          });
        }
      });
    });
  },
};
