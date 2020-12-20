const searchModel = require("../models/search");
const form = require("../helpers/form");

module.exports = {
  searchRecipes: (req, res) => {
    const { keyword } = req.query;
    searchModel
      .searchRecipes(keyword)
      .then((data) => {
        if (!data.length) {
          req.status(404).json({
            msg: "Data not Found",
            status: 404,
          });
        } else {
          form.success(res, data);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
