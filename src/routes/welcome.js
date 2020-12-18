const welcomeRouter = require("express").Router();

welcomeRouter.get("/", (_, res) => {
  res.send("Welcome To Recipedia");
});

module.exports = welcomeRouter;
