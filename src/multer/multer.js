
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/storage')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // Extracting file extension
        const fileExtension = file.originalname.split('.').pop()
        cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.' + fileExtension)
    }
})

const upload = multer({ storage: storage })

module.exports = upload