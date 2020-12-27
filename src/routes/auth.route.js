const authRouter = require("express").Router();

const authController = require("../controllers/auth.controller");
const verifyAccess = require("../helpers/middlewares/verifyAccess");

authRouter.post(
  "/register",
  verifyAccess.isRegistered,
  authController.register
);
authRouter.post("/login", authController.login);
authRouter.post("/logout", verifyAccess.isLogin, authController.logout);
authRouter.get("/verify/:tokenId", authController.verify);
authRouter.post("/forgot", authController.forgot);
// authRouter.post("/otp", authController.otp);
// authRouter.patch("/reset/", authController.reset);

module.exports = authRouter;
