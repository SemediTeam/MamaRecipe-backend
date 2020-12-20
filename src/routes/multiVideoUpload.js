const multiVideoUploadRouter = require("express").Router();
const multiVideoUpload = require("../helpers/middlewares/multiUploadVideo");

multiVideoUploadRouter.post("/", multiVideoUpload);

module.exports = multiVideoUploadRouter;