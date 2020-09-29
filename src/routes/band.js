const {
    createBand,
    prepareCreateBand,
    readBand,
    prepareReadBand
} = require('../controllers/band');

module.exports = function (app) {

    app.get('/api/band', async function (req, res) {

        readBand(prepareReadBand(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.post('/api/band', async function (req, res) {

        createBand(prepareCreateBand(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}