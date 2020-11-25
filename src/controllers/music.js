const Album = require('../models/Album');
const Music = require('../models/Music');

const upload = require('../services/upload');

const prepareCreateMusic = ({
    dataReq: {
        _id
    },
    file: {
        originalname,
        buffer
    },
    body: {
        audio_name,
        album
    }
}) => {

    return {
        album,
        originalname,
        buffer,
        audio_name,
        _id
    }
}

const createMusic = async (data) => {

    let response;

    try {

        const albumById = await Album.findById(data.album).populate('musics');

        const music = new Music({
            name: data.audio_name,
            album: data.album
        });

        const path = `bands/${albumById.band}/albums/${albumById._id}/musics/${music._id}_${data.originalname}`;

        const resp = await upload(data.buffer, path);

        if(resp.Key) {

            music.path = resp.Key;
            await music.save();

            albumById.musics.push(music);
            await albumById.save();

            response = {
                json: {
                    message: 'Music successfully created!',
                    musics: albumById.musics
                }, status: 200
            }
        }else {

            response = {
                json: {
                    message: 'Error in create music!'
                }, status: 500
            }
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in create music!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

module.exports = {
    createMusic,
    prepareCreateMusic,
};