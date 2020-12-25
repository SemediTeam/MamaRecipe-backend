const mainRouter = require("express").Router();

const welcomeRouter = require("./welcome");
const authRouter = require("./auth.route");
const recipesRouter = require("./recipes");
const searchRouter = require("./search");
<<<<<<< HEAD
const likesRouter = require("./likes");
=======
const commentRouter = require("./comments")
>>>>>>> 11e858cbccd61a4e7e9cc614160986edc414ae00

mainRouter.use("/", welcomeRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/recipe", recipesRouter);
mainRouter.use("/search", searchRouter);
mainRouter.use("/likes", likesRouter);

mainRouter.use("/comments", commentRouter)

module.exports = mainRouter;
