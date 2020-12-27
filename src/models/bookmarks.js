const db = require("../config/mySQL");

module.exports = {
  addBookmarks: (id_users, recipe_id) => {
    const body = {
      id_user: id_users,
      id_recipe: recipe_id
    };
    return new Promise((resolve, reject) => {
      const qs = `INSERT INTO bookmark SET ?`;
      db.query(qs, body, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `Recipe ${recipe_id}  has been bookmarked`,
            bookmarkId: data.insertId,
          });
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

  getBookmarks: (id_users) => {
    return new Promise((resolve, reject) => {
        const queryStr = `SELECT br.id, r.id_recipe, r.recipe_img, r.recipe_desc, r.recipe_ingredients FROM bookmark AS br JOIN recipes AS r ON br.id_recipe = r.id_recipe WHERE br.id_user = ?`;
        db.query(queryStr, id_users, (err, data) => {
          if (!err) {
            if (data.length) {
              resolve({
                status: 200,
                message: `Bookmark`,
                data: data,
              });
            } else {
              resolve({
                status: 404,
                message: `Bookmark`,
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

  deleteBookmarks: (params) => {
    return new Promise((resolve, reject) =>{
      const qs = `DELETE FROM bookmark WHERE id = ?`
      db.query(qs, [params], (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  }
};
