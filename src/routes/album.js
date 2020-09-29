const {
    createAlbum,
    prepareCreateAlbum
} = require('../controllers/album');

module.exports = function (app) {

    app.get('/api/album', async function (req, res) {

        console.log({
            result: 'OK'
        });
    });

    app.post('/api/album', async function (req, res) {

        createAlbum(prepareCreateAlbum(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}