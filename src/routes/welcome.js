const welcomeRouter = require('express').Router();

welcomeRouter.get("/", (req, res) => {
    res.send("Welcome To Recipedia")
})

module.exports = welcomeRouter;

