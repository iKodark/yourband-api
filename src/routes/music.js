const {
    createMusic,
    prepareCreateMusic
} = require('../controllers/music');

const multer = require('multer');
const uploadMulter = multer();

const AWS = require("aws-sdk");

module.exports = function (app) {

    app.get('/api/musics', async function (req, res) {

        AWS.config.update({
            accessKeyId: "AKIAJXPSONVQG2LSGBJA",
            secretAccessKey: "ziMa4hBRP9GmlKox5uMSoIafE58QqfaIT9d0Y6gV"
        });

        const s3 = new AWS.S3();

        const bucketParams = {
            Bucket : 'yourband',
        };

        const result = s3.listObjects(bucketParams, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        });

        console.log(result);
    });

    app.post('/api/music', uploadMulter.single('audio'), async function (req, res) {
        // console.log(req.file);
        // console.log(req.body);
        // res.send('Taok')
        createMusic(prepareCreateMusic(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}