const {
    createBand,
    prepareCreateBand,
    readBands,
    prepareReadBands,
    readBand,
    prepareReadBand,
    updateBand,
    prepareUpdateBand
} = require('../controllers/band');

module.exports = function (app) {

    app.get('/api/bands', async function (req, res) {

        readBands(prepareReadBands(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.post('/api/band', async function (req, res) {

        createBand(prepareCreateBand(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.get('/api/band/:band', async function (req, res) {

        readBand(prepareReadBand(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.put('/api/band/:band', async function (req, res) {

        updateBand(prepareUpdateBand(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}