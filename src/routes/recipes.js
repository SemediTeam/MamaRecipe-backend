const recipesRouter = require("express").Router();

const recipesController = require("../controllers/recipes");
const uploadImage = require("../helpers/middlewares/multiUploadImage")
const uploadVideo = require("../helpers/middlewares/multiUploadVideo")

recipesRouter.post("/", uploadImage, uploadVideo, recipesController.addRecipes);


module.exports = recipesRouter;