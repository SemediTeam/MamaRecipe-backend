const multer = require("multer");
const path = require("path");
const form = require("../form.helper");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const nameFormat = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: 5 * 1024 * 1024, // 5 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}

const uploadImg = {
  singleUpload: (req, res, next) => {
    const singleUpload = upload.single("user_img");
    singleUpload(req, res, (err) => {
      if (err) {
        form.error(res, "Multer Error", err, 400);
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
