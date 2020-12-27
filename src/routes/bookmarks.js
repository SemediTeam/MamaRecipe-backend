const bookmarksRouter = require('express').Router();

const bookmarksController = require("../controllers/bookmarks");

const checkToken = require("../helpers/middlewares/verifyAccess");

bookmarksRouter.get("/", checkToken.isLogin, bookmarksController.getBookmarks);
bookmarksRouter.post("/", checkToken.isLogin, bookmarksController.addBookmarks);
bookmarksRouter.delete("/:id", checkToken.isLogin, bookmarksController.deleteBookmarks);

module.exports = bookmarksRouter;