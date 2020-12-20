const authRouter = require("express").Router();

const authController = require("../controllers/auth.controller");
const verifyAccess = require("../middlewares/verifyAccess");

authRouter.post(
  "/register",
  verifyAccess.isRegistered,
  authController.register
);
authRouter.post("/login", authController.login);
authRouter.post("/logout", verifyAccess.isLogin, authController.logout);

module.exports = authRouter;