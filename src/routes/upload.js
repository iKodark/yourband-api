const {
    upload,
    read,
    uploadS3
} = require('../controllers/upload');

const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
const uploadMulter = multer();

module.exports = function (app) {
    app.post('/api/upload', async function (req, res) {

           upload(req)
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.get('/api/read', async function (req, res) {

           read(req)
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.post('/api/uploads3', uploadMulter.single('audio'), async function (req, res) {
              console.log(req.file);
       //     uploadS3(req)
       //     .then((success) => {res.status(success.status).json(success.json)})
       //     .catch((error) => {res.status(error.status).json(error.json)})
    });
}