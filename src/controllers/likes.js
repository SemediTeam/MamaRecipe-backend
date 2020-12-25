const likesModels = require("../models/likes");
const form = require("../helpers/form");

module.exports = {
  postLike: (req, res) => {
    const { body } = req;
    likesModels
      .postLike(body)
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
};
