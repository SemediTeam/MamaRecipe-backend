const mainRouter = require("express").Router();

const welcomeRouter = require("./welcome");
const recipesRouter = require("./recipes")

mainRouter.use("/", welcomeRouter);
mainRouter.use("/recipe", recipesRouter )

module.exports = mainRouter;
