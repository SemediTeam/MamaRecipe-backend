const likesRouter = require("express").Router();

const likesController = require("../controllers/likes");
const checkToken = require("../helpers/middlewares/verifyAccess");

likesRouter.get("/", checkToken.isLogin, likesController.getLikeRecipe);
likesRouter.post("/", checkToken.isLogin, likesController.postLike);
likesRouter.delete(
  "/:id_recipe",
  checkToken.isLogin,
  likesController.deleteLikeRecipe
);

module.exports = likesRouter;
