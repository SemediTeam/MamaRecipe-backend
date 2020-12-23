const multer = require("multer");
const path = require("path");
const form = require("../form");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    
    if (file.fieldname === "images" && ext === fileTypesImages ) {
      cb(null, "./public/images");
    } else if (file.fieldname === "videos" && ext === fileTypesVideos) {
      cb(null, "./public/videos");
    } else {
      cb(null,  false)
    }
  },
  filename: function (req, file, cb) {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  const fileTypesImages = /mp4|mkv|jpeg|jpg|png/
    const fileTypesVideos = /mp4|mkv|mpeg/
    if (ext !== fileTypesVideos || ext !== fileTypesImages) {
      return  cb('Error: Extension not supported')
    } else {
      cb(null, true)
    }
}

const upload = multer({
  storage: multerStorage,
  limits: 20 * 1000 * 1000,
  fileFilter
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname);
  //   if (ext !== ".mp4" && ext !== ".mkv" && ext !== ".mpeg" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
  //     return  cb('Error: Extension not supported')
  //   }
  //   cb(null, true)
    // const fileTypes = /mp4|mkv|jpeg|jpg|png/
    // const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // const mimetype = fileTypes.test(file.mimetype);

  //   const typeArray = type.split("/");
  // if (typeArray[0] == "videos" || typeArray[0] == "images") {
  //   cb(null, true);
  // }else {
  //   cb(null, false);
  // }
  
    // console.log(file);
    // if (mimetype && extname) {
    //   return cb(null, true)
    // } else {
    //   cb('Error: Extension not supported')
    // }
  // }
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
