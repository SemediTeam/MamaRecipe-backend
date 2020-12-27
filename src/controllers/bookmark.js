const bookmarkModel = require("../models/bookmark");

module.exports = {
  addBookmark: (req, res) => {
    const id_user = req.decodedToken.id_user;
    const { recipeId } = req.params;
    bookmarkModel
      .addBookmark(id_user, recipeId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

  getBookmark: (req, res) => {
    const id_user = req.decodedToken.id_user;
    bookmarkModel
      .getBookmark(id_user)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

  unBookmark: (req, res) => {
    const { bookmarkId } = req.params;
    bookmarkModel
      .unBookmark(bookmarkId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
};
