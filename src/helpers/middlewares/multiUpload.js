const multer = require("multer");
const path = require("path");
const form = require("../form");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (file.fieldname === "images" && (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg")) {
      cb(null, "./public/images");
    } else if (file.fieldname === "videos" && (file.mimetype === "video/mp4" || file.mimetype === "video/3gp" || file.mimetype === "video/x-matroska" || file.mimetype === "video/mpeg")) {
      cb(null, "./public/videos");
    } else {
      cb("error")
    }

    // if (file.fieldname === "images") {
    //   cb(null, "./public/images");
    // } if (file.fieldname === "videos") {
    //   cb(null, "./public/videos");
    // } else {
    //   cb(null,  false)
    // }
  },
  filename: function (req, file, cb) {
    const nameImage = `image-${Date.now()}${path.extname(file.originalname)}`;
    const nameVideo = `video-${Date.now()}${path.extname(file.originalname)}`;

    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, nameImage)
    } else if (file.mimetype == "video/x-matroska" || file.mimetype == "video/mp4" || file.mimetype == "video/mpeg") {
      cb(null, nameVideo)
    }
  },
});

const upload = multer({
  storage: multerStorage,
  limits: 20 * 1000 * 1000,
});
const multiUpload = (req, res, next) => {
  const dataUpload = upload.fields([
    { name: "images", maxCount: 2 },
    { name: "videos", maxCount: 10 },
  ]);
  dataUpload(req, res, (err) => {
    if (err) {
      form.error(res, {
        msg: "Multer Error",
        err,
      });
    } else {
      next();
    }
  });
};

module.exports = multiUpload;