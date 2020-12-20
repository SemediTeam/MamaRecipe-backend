const multiImageUploadRouter = require("express").Router();
const multiImageUpload = require("../helpers/middlewares/multiUploadImage");

multiImageUploadRouter.post("/", multiImageUpload);

module.exports = multiImageUploadRouter;