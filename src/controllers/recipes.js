const recipesModel = require("../models/recipes");
const form = require("../helpers/form");

module.exports = {
  addRecipes: (req, res) => {
    const { body } = req;
    const filePathImages = JSON.stringify(
      req.files.map(
        (e) => process.env.LOCAL + "/images" + "/" + e.filename + " "
      )
    );
    const filePathVideos = JSON.stringify(
      req.files.map(
        (e) => process.env.LOCAL + "/videos" + "/" + e.filename + " "
      )
    );

    const insertBody = {
      ...body,
      updated_at: new Date(Date.now()),
      recipe_img: filePathImages,
      recipe_video: filePathVideos,
    };
    productsModel;

    recipesModel
      .addRecipes(insertBody, filePathImages, filePathVideos)
      .then((data) => {
        const successAdd = {
          msg: "Recipe has been added",
          data: {
            id: data.insertId,
            ...insertBody,
          },
        };
        form.success(res, successAdd);
      })
      .catch((err) => {
        const error = {
          msg: "Recipe failed to add",
          err,
        };
        form.error(res, error);
      });
  },
};
