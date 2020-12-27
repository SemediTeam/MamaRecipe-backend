const bookmarksModel = require("../models/bookmarks");
const form = require("../helpers/form");

module.exports = {
  addBookmarks: (req, res) => {
    const id_users = req.decodedToken.id_user;
    const { recipe_id } = req.body;
    bookmarksModel
      .addBookmarks(id_users, recipe_id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  getBookmarks: (req, res) => {
    const id_users = req.decodedToken.id_user;
    bookmarksModel
      .getBookmarks(id_users)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  deleteBookmarks: (req, res) => {
    const { id } = req.params;
    // const id_users = req.decodedToken.id_user;
    bookmarksModel
      .deleteBookmarks(id)
      .then((data) => {
        if (data.affectedRows === 0) {
          res.status(404).json({
            msg: "Bookmark not found",
          });
          // res.status(200).json(data);
        } else {
          res.status(200).json({
            msg: `Bookmark deleted`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
