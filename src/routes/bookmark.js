const bookmarkRouter = require("express").Router();

const bookmarkController = require("../controllers/bookmark")

const checkToken = require("../helpers/middlewares/verifyAccess")

bookmarkRouter.post("/:recipeId", checkToken.isLogin, bookmarkController.addBookmark)
bookmarkRouter.get ("/", checkToken.isLogin, bookmarkController.getBookmark) //fail
bookmarkRouter.delete("/:bookmarkId", checkToken.isLogin, bookmarkController.unBookmark)

module.exports = bookmarkRouter;