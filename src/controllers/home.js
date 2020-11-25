const Band = require('../models/Band');
const Album = require('../models/Album');
const Music = require('../models/Music');

const home = async () => {

    let response;

    try {

        const bands = await Band.find({});
        const albums = await Album.find({});
        const musics = await Music.find({});

        response = {
            json: {
                message: 'Home successfully read!',
                bands,
                albums,
                musics
            }, status: 200
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in read home!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

module.exports = {
    home
};