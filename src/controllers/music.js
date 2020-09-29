const Band = require('../models/Band');

const prepareCreateMusic = ({
    dataReq: {
        _id
    },
    body: {
        band,
        album,
        musics
    },
}) => {

    return {
        band,
        album,
        musics,
        _id
    }
}

const createMusic = async (data) => {

    let response;

    try {

        const res = await Band.findOneAndUpdate(
            { _id: data.band, user: data._id, "albums._id": data.album },
            { $push: { 'albums.$.musics': {$each: data.musics} } },
            { useFindAndModify: false, runValidators: true, new: true }
        );
        console.log('Teste', res);
        if(res){

            response = {
                json: {
                    message: 'Music successfully created!',
                    bands: res.albums
                }, status: 200
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