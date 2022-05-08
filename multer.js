const { randomBytes } = require('crypto');
const multer  = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '/uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, `${randomBytes(16).toString('hex')}_${file.originalname}`)
        }
    })
});

module.exports = upload;