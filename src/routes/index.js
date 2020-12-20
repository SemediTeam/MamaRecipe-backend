const mainRouter = require("express").Router();

const welcomeRouter = require("./welcome");
const recipesRouter = require("./recipes")

mainRouter.use("/", welcomeRouter);
mainRouter.use("/recipes", recipesRouter )

module.exports = mainRouter;
