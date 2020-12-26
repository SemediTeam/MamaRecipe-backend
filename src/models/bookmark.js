const db = require("../config/mySQL");

module.exports = {
  addBookmark: (id_user, id_recipe) => {
    const body = {
      id_user: id_user,
      id_recipe: id_recipe,
    };
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO bookmark SET ?";
      db.query(qs, body, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            msg: `Recipe ${id_recipe}  has been bookmarked`,
            bookmarkId: data.insertId,
          });
        } else {
          reject({
            status: 500,
            msg: "Error",
            details: err,
          });
        }
      });
    });
  },

  getBookmark: (id_user) => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT r.recipe_img, r.recipe_name FROM recipes as r JOIN bookmark as b ON b.id_recipe = r.id_recipe WHERE b.id_user = ?";
      db.query(qs, id_user, (err, data) => {
        if (!err) {
          if (data.length) {
            resolve({
              status: 200,
              msg: "Success",
              data: data,
            });
          } else {
            resolve({
              status: 404,
              msg: "Error",
              data: "Data Not Found",
            });
          }
        } else {
          reject({
            status: 500,
            msg: "Error",
            details: err,
          });
        }
      });
    });
  },

  unBookmark: (bookmarkId) => {
    return new Promise((resolve, reject) => {
      const qs = "DELETE FROM bookmark WHERE id = ?";
      db.query(qs, bookmarkId, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            msg: `un Bookmark: ${bookmarkId}`,
          });
        } else {
          reject({
            status: 500,
            msg: "Error",
            details: err,
          });
        }
      });
    });
  },
};
