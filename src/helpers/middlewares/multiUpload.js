const multer = require("multer");
const path = require("path");
const form = require("../form");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "images") {
      cb(null, "./public/images");
    } else if (file.fieldname === "videos") {
      cb(null, "./public/videos");
    }
  },
  filename: function (req, file, cb) {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: 20 * 1000 * 1000,
});

const multiUpload = (req, res, next) => {
  //   const uploadMulti = upload.array("images", 10);
  const dataUpload = upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 5 },
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
