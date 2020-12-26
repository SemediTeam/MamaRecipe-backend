const likesRouter = require("express").Router();

const likesController = require("../controllers/likes");
const checkToken = require("../helpers/middlewares/verifyAccess");

likesRouter.post("/", checkToken.isLogin, likesController.postLike);

module.exports = likesRouter;
