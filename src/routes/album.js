const {
    createAlbum,
    prepareCreateAlbum,
    readAlbums,
    prepareReadAlbums,
    readAlbum,
    prepareReadAlbum,
    updateAlbum,
    prepareUpdateAlbum
} = require('../controllers/album');

module.exports = function (app) {

    app.get('/api/albums/:band', async function (req, res) {

        readAlbums(prepareReadAlbums(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.post('/api/album', async function (req, res) {

        createAlbum(prepareCreateAlbum(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.get('/api/album/:album', async function (req, res) {

        readAlbum(prepareReadAlbum(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.put('/api/album/:album', async function (req, res) {

        updateAlbum(prepareUpdateAlbum(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}