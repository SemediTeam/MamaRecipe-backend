const userRouter = require("express").Router();

// const form = require("../helpers/form.helper");
const userController = require("../controllers/user.controller");
const uploadImg = require("../helpers/middlewares/upload");
const verifyAccess = require("../helpers/middlewares/verifyAccess");

userRouter.get("/:id", verifyAccess.isLogin, userController.getUserById);
userRouter.patch("/:id", verifyAccess.isLogin, userController.updateUser);
userRouter.patch("/img/:id", uploadImg.singleUpload, userController.updateUser);

// userRouter.post("/liked/:recipeId", verifyAccess.isLogin, userController.addLike)
// userRouter.get ("/liked/:userId", verifyAccess.isLogin, userController.getLike)
// userRouter.delete("/liked/:likedId", verifyAccess.isLogin, userController.unLike)

// userRouter.post("/saved/:recipeId", verifyAccess.isLogin, userController.addSave)
// userRouter.get ("/saved/:userId", verifyAccess.isLogin, userController.getSave)
// userRouter.delete("/saved/:savedId", verifyAccess.isLogin, userController.unSave)

// userRouter.post("/comments/:recipeId", verifyAccess.isLogin, userController.addComment)
// userRouter.get("/comments/:recipeId", verifyAccess.isLogin, userController.getComment)
// userRouter.delete("/comments/:commentId", verifyAccess.isLogin, userController.unComment)

module.exports = userRouter;
