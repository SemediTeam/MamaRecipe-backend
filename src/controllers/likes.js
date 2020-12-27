const likesModels = require("../models/likes");
const form = require("../helpers/form");

module.exports = {
  postLike: (req, res) => {
<<<<<<< HEAD
    const { body } = req;
    const { id_recipe } = req.body;
    const id_user = req.decodedToken.id_user;
    const userLiked = {
      ...body,
      id_user: id_user
    }
    likesModels
      .postLike(id_user, id_recipe)
      .then((data) => {
      
        // if (userLiked ) {
          
        // }
        // const resObject = {
        //   msg: "Like recipe",
        // };
        res.status(200).json(data);
=======
    const { id_recipe } = req.body;
    const id_user = req.decodedToken.id_user;
    likesModels
      .postLike(id_user, id_recipe)
      .then(() => {
        const resObject = {
          msg: "Like recipe",
        };
        res.status(200).json(resObject);
>>>>>>> 161982f06634a3b7c923da6a7259fa6feed18de6
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
  getLikeRecipe: (req, res) => {
    likesModels
      .getRecipeLike(req)
      .then((data) => {
        if (data.length) {
          res.status(200).json({
            data,
          });
        } else {
          res.status(404).json({
            msg: "Data not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
