const {
    upload,
    read
} = require('../controllers/upload');

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
}