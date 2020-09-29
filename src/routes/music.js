const {
    createMusic,
    prepareCreateMusic
} = require('../controllers/music');

module.exports = function (app) {

    app.get('/api/musics', async function (req, res) {

        console.log({
            result: 'OK'
        });
    });

    app.post('/api/musics', async function (req, res) {

        createMusic(prepareCreateMusic(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}