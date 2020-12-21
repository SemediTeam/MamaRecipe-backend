const recipesRouter = require("express").Router();

const recipesController = require("../controllers/recipes");
const uploadMiddleware = require("../helpers/middlewares/multiUpload");

recipesRouter.post("/", uploadMiddleware, recipesController.addRecipes);
// recipesRouter.post("/", recipesController.addRecipes);


module.exports = recipesRouter;