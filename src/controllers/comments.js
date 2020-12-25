const commentsModel = require("../models/comments");
const form = require("../helpers/form");

module.exports = {
  addComment: (req, res) => {
    const { id_recipe } = req.body;
    const { comment } = req.body;
    const id_user = req.decodedToken.id_user;

    commentsModel
      .addComment(id_user, id_recipe, comment)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  getComment: (req, res) => {
    const { recipeId } = req.params;
    // const id_user = req.decodedToken.id_user;

    commentsModel
      .getComment(recipeId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
