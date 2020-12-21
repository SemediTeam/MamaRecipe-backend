const mainRouter = require("express").Router();

const welcomeRouter = require("./welcome");
const recipesRouter = require("./recipes");
const searchRouter = require("./search");

mainRouter.use("/", welcomeRouter);
<<<<<<< HEAD
mainRouter.use("/recipe", recipesRouter )
=======
mainRouter.use("/recipes", recipesRouter);
mainRouter.use("/search", searchRouter);
>>>>>>> a9263afbff65858b8795c3d0eea554feb82f99c2

module.exports = mainRouter;
