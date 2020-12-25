const recipesRouter = require("express").Router();

const recipesController = require("../controllers/recipes");
const uploadMiddleware = require("../helpers/middlewares/multiUpload");
const checkToken = require("../helpers/middlewares/verifyAccess")

<<<<<<< HEAD
recipesRouter.post("/", uploadMiddleware, recipesController.addRecipes);
recipesRouter.get("/new", recipesController.getAllRecipesNew);
recipesRouter.get("/popular", recipesController.getAllRecipesPopular);
=======
recipesRouter.get("/", recipesController.getAllRecipe)
>>>>>>> 11e858cbccd61a4e7e9cc614160986edc414ae00
recipesRouter.get("/:id", recipesController.getSingleRecipe);
recipesRouter.post("/", checkToken.isLogin, uploadMiddleware, recipesController.addRecipes);
recipesRouter.patch("/:id", checkToken.isLogin, uploadMiddleware, recipesController.updateRecipes);
recipesRouter.delete("/:id", checkToken.isLogin, recipesController.deleteRecipes);

module.exports = recipesRouter;
