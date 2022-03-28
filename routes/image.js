const multer = require("multer")
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '.jpg');
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {

        console.log(req.file);
        return res.send({
            success: true,
            path: `/img/${req.file.filename}`
        })
    }
});

module.exports = router