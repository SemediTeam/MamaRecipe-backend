const likesRouter = require("express").Router();

const likesController = require("../controllers/likes");
const checkToken = require("../helpers/middlewares/verifyAccess");

likesRouter.post("/", checkToken.isLogin, likesController.postLike);
likesRouter.delete(
  "/:id_recipe",
  checkToken.isLogin,
  likesController.deleteLikeRecipe
);
likesRouter.get("/:id", checkToken.isLogin, likesController.getLikeRecipe);

module.exports = likesRouter;
