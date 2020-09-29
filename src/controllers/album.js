const Band = require('../models/Band');

const prepareCreateAlbum = ({
    dataReq: {
        _id
    },
    body: {
        band,
        name
    },
}) => {

    return {
        band,
        name,
        _id
    }
}

const createAlbum = async (data) => {

    let response;

    try {

        const res = await Band.findOneAndUpdate(
            { _id: data.band, user: data._id },
            { $push: { albums: { name: data.name } } },
            { useFindAndModify: false, runValidators: true, new: true }
        );
        console.log('Teste', res);
        if(res){

            response = {
                json: {
                    message: 'Album successfully created!',
                    bands: res.albums
                }, status: 200
            }
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in create album!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

module.exports = {
    createAlbum,
    prepareCreateAlbum,
};