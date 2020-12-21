const mainRouter = require("express").Router();

const welcomeRouter = require("./welcome");
const recipesRouter = require("./recipes");
const searchRouter = require("./search");

mainRouter.use("/", welcomeRouter);
mainRouter.use("/recipe", recipesRouter )
mainRouter.use("/recipes", recipesRouter);
mainRouter.use("/search", searchRouter);

module.exports = mainRouter;
