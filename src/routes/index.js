const mainRouter = require("express").Router();

const welcomeRouter = require("./welcome");
const authRouter = require("./auth.route");
const recipesRouter = require("./recipes");
const searchRouter = require("./search");

mainRouter.use("/", welcomeRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/recipe", recipesRouter);
mainRouter.use("/search", searchRouter);

module.exports = mainRouter;
