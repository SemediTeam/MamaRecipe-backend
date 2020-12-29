const commentsRouter = require('express').Router();

const commentsController = require("../controllers/comments")

const checkToken = require("../helpers/middlewares/verifyAccess")

commentsRouter.post("/", checkToken.isLogin, commentsController.addComment)
commentsRouter.get("/:recipeId", commentsController.getComment)


module.exports = commentsRouter;