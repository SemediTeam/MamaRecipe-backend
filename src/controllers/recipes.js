const recipesModel = require("../models/recipes");
const form = require("../helpers/form");

module.exports = {
  addRecipes: (req, res) => {
    const { body } = req;
    // const { id_user } = req.body;
    const user_id = req.decodedToken.id_user;
    const filePathImages = JSON.stringify(
      req.files.images.map(
        (e) => process.env.SERVER + "/images" + "/" + e.filename + " "
      )
    );

    const filePathVideo = JSON.stringify(
      req.files.videos.map(
        (e) => process.env.SERVER + "/videos" + "/" + e.filename + " "
      )
    );
    const insertBody = {
      ...body,
      updated_at: new Date(Date.now()),
      id_user: user_id,
      recipe_img: filePathImages,
      recipe_video: filePathVideo,
    };
    recipesModel
      .addRecipes(insertBody, filePathImages, filePathVideo)
      .then((data) => {
        console.log(data);
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

  getAllRecipe: (req, res) => {
    recipesModel
      .getAllRecipe()
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

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

  getAllRecipeByUser: (req, res) => {
    const id_users = req.decodedToken.id_user;
    recipesModel.getAllRecipeByUser(id_users)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json(err)

    })
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
          res.status(200).json({
            msg: "Recipe deleted",
          });
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
  updateRecipes: (req, res) => {
    const { body } = req;
    const { id } = req.params;

    const filePathImages = JSON.stringify(
      req.files.images.map(
        (e) => process.env.SERVER + "/images" + "/" + e.filename + " "
      )
    );

    const filePathVideo = JSON.stringify(
      req.files.videos.map(
        (e) => process.env.SERVER + "/videos" + "/" + e.filename + " "
      )
    );
    const insertBody = {
      ...body,
      recipe_img: filePathImages,
      recipe_video: filePathVideo,
    };

    recipesModel
      .updateRecipes(insertBody, id)
      .then((data) => {
        if (data.affectedRows === 0) {
          res.status(404).json({
            msg: "Recipe Not Found",
          });
        } else {
          const newResObj = {
            id_recipe: id,
            ...insertBody,
          };
          form.success(res, newResObj);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
  getAllRecipesNew: (req, res) => {
    recipesModel
      .getAllRecipesNew()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getAllRecipesPopular: (req, res) => {
    recipesModel
      .getAllRecipesPopular()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
