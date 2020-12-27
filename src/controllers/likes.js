const likesModels = require("../models/likes");
const form = require("../helpers/form");

module.exports = {
  postLike: (req, res) => {
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
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
