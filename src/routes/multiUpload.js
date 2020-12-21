const multiUploadRouter = require("express").Router();
const multiUpload = require("../helpers/middlewares/multiUpload");

multiUploadRouter.post("/", multiUpload);

module.exports = multiImageUploadRouter;
