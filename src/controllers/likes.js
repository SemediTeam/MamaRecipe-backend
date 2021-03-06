const likesModels = require("../models/likes");
const form = require("../helpers/form");

module.exports = {
  postLike: (req, res) => {
    const { id_recipe } = req.body;
    const id_user = req.decodedToken.id_user;
    likesModels
      .postLike(id_user, id_recipe)
      .then(() => {
        const resObject = {
          msg: "Like recipe",
        };
        res.status(200).json(resObject);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
  getLikeRecipe: (req, res) => {
    const id_users = req.decodedToken.id_user;
    likesModels
      .getRecipeLike(id_users)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteLikeRecipe: (req, res) => {
    const { id_recipe } = req.params;
    const id_user = req.decodedToken.id_user;
    likesModels
      .deleteLikeRecipe(id_user, id_recipe)
      .then(() => {
        const resObject = {
          msg: "Unlike Recipe",
        };
        res.status(200).json(resObject);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
