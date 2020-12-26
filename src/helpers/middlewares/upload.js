const multer = require("multer");
const path = require("path");
const form = require("../form.helper");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});
const limits = {
  fileSize: 3 * 1000 * 1000,
};
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|gif|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    cb(null, true);
  } else {
    cb("Error: Images Only");
  }
};
const upload = multer({
  storage,
  limits,
  fileFilter,
});

const uploadImg = {
  singleUpload: (req, res, next) => {
    const singleUpload = upload.single("user_img");
    singleUpload(req, res, (err) => {
      if (req.file == undefined) {
        form.error(res, "No Images Selected", err, 400);
      } 
      if (err) {
        form.error(res, "Error Ocurred", err, 400);
      } else {
        try {
          req.body.user_img =
            process.env.LOCAL + "/images/" + req.file.filename;
        } catch {
          err;
        } finally {
          next();
        }
      }
    });
  },
  multipleUpload: (req, res, next) => {
    const multipleUpload = upload.array("image", 5);
    multipleUpload(req, res, (err) => {
      if (err) {
        res.json({
          msg: err,
        });
      } else {
        try {
          const image = req.files.map((file) => {
            return process.env.LOCAL + file.filename;
          });
          req.body.image = image.join(",");
        } catch {
          err;
        } finally {
          next();
        }
      }
    });
  },
};

module.exports = uploadImg;
