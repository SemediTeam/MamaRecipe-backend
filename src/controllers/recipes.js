const recipesModel = require("../models/recipes");
const form = require("../helpers/form");

module.exports = {
  addRecipes: (req, res) => {
    const { body } = req;
    const filePathImages = JSON.stringify(
<<<<<<< HEAD
      req.files.map(
        (e) => process.env.LOCAL + "/images" + "/" + e.filename + " "
      )
    );
    const filePathVideos = JSON.stringify(
      req.files.map(
        (e) => process.env.LOCAL + "/videos" + "/" + e.filename + " "
      )
    );

=======
      req.files.images.map(
        (e) => "http://localhost:6000" + "/images" + "/" + e.filename + " "
      )
    );

    const filePathVideo = JSON.stringify(
      req.files.videos.map(
        (e) => "http://localhost:6000" + "/videos" + "/" + e.filename + " "
      )
    );
>>>>>>> 71702848e74712fb29edf80a66f5e62d4ce0289b
    const insertBody = {
      ...body,
      updated_at: new Date(Date.now()),
      recipe_img: filePathImages,
<<<<<<< HEAD
      recipe_video: filePathVideos,
    };
    productsModel;

    recipesModel
      .addRecipes(insertBody, filePathImages, filePathVideos)
      .then((data) => {
=======
      recipe_video: filePathVideo,
    };

    recipesModel
      .addRecipes(insertBody, filePathImages, filePathVideo)
      .then((data) => {
        console.log(data);
>>>>>>> 71702848e74712fb29edf80a66f5e62d4ce0289b
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
<<<<<<< HEAD
=======

  getSingleRecipe: (req, res) => {
    const { id } = req.params;
    recipesModel
      .getSingleRecipe(id)
      .then((data) => {
        if (!data.length) {
          res.status(404).json({
            msg: "Recipe not found",
          });
        } else {
          form.success(res, data[0]);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  deleteRecipes: (req, res) => {
    const { id } = req.params;
    recipesModel
      .deleteRecipes(id)
      .then((data) => {
        if (data.affectedRows === 0) {
          res.status(404).json({
            msg: "Recipe not found",
          });
        } else {
          const newResObj = {
            msg: "Recipe deleted",
            status: 200,
          };
          res.json(newResObj);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
>>>>>>> 71702848e74712fb29edf80a66f5e62d4ce0289b
};
