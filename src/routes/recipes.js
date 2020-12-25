const recipesRouter = require("express").Router();

const recipesController = require("../controllers/recipes");
const uploadMiddleware = require("../helpers/middlewares/multiUpload");
const checkToken = require("../helpers/middlewares/verifyAccess")

recipesRouter.get("/", recipesController.getAllRecipe)
recipesRouter.get("/:id", recipesController.getSingleRecipe);
recipesRouter.post("/", checkToken.isLogin, uploadMiddleware, recipesController.addRecipes);
recipesRouter.patch("/:id", checkToken.isLogin, uploadMiddleware, recipesController.updateRecipes);
recipesRouter.delete("/:id", checkToken.isLogin, recipesController.deleteRecipes);

module.exports = recipesRouter;
