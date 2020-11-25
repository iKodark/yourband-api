const {
    home
} = require('../controllers/home');

module.exports = function (app) {

    app.get('/api/home', async function (req, res) {

        home()
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}