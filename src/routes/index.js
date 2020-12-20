const mainRouter = require("express").Router();

const welcomeRouter = require("./welcome");
const authRouter = require("./auth.route");

mainRouter.use("/", welcomeRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
