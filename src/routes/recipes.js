const recipesRouter = require("express").Router();

const recipesController = require("../controllers/recipes");
const uploadMiddleware = require("../helpers/middlewares/multiUpload");

recipesRouter.post("/", uploadMiddleware, recipesController.addRecipes);
recipesRouter.get("/:id", recipesController.getSingleRecipe);
recipesRouter.delete("/:id", recipesController.deleteRecipes);
// recipesRouter.post("/", recipesController.addRecipes);

module.exports = recipesRouter;
