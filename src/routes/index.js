const mainRouter = require("express").Router();

const welcomeRouter = require("./welcome");
const authRouter = require("./auth.route");
const recipesRouter = require("./recipes");
const searchRouter = require("./search");
const userRouter = require("./user.route");
const likesRouter = require("./likes");
const commentRouter = require("./comments");
<<<<<<< HEAD
const bookmarksRouter = require("./bookmarks")
=======
const bookmarkRouter = require("./bookmark");

>>>>>>> 161982f06634a3b7c923da6a7259fa6feed18de6

mainRouter.use("/", welcomeRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/recipe", recipesRouter);
mainRouter.use("/search", searchRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/likes", likesRouter);
<<<<<<< HEAD
mainRouter.use("/bookmarks", bookmarksRouter);

=======
>>>>>>> 161982f06634a3b7c923da6a7259fa6feed18de6
mainRouter.use("/comments", commentRouter);
mainRouter.use("/bookmark", bookmarkRouter);

module.exports = mainRouter;
