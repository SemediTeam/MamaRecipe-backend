const mainRouter = require('express').Router();
const welcomeRouter = require("./welcome");



mainRouter.use("/", welcomeRouter);

module.exports = mainRouter;

