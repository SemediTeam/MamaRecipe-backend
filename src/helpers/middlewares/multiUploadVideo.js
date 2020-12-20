const multer = require("multer");
const path = require("path");
const form = require("../form");

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/videos')
    },
    filename: function(req, file, cb) {
        const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
            file.originalname
        )}`
        cb(null, nameFormat)
    }
})

const upload = multer({
    storage: multerStorage,
    limits: 50 * 1000 * 1000,
})

const multiUploadVideo = (req, res, next) => {
    const uploadMulti = upload.array("video", 10)
    uploadMulti(req, res, (err) => {
        if(err) {
            form.error(res, {
                msg: "Multer Error",
                err,
            })
        } else {
            next();
        }
    })
}

module.exports = multiUploadVideo;