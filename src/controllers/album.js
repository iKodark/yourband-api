const Band = require('../models/Band');
const Album = require('../models/Album');

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

        // const res = await Band.findOneAndUpdate(
        //     { _id: data.band, user: data._id },
        //     { $push: { albums: { name: data.name } } },
        //     { useFindAndModify: false, runValidators: true, new: true }
        // );

        const album = await Album.create({
            name: data.name,
            band: data.band
        });

        await album.save();

        const bandById = await Band.findById(data.band).populate('albums');

        bandById.albums.push(album);
        await bandById.save();

        response = {
            json: {
                message: 'Album successfully created!',
                albums: bandById.albums
            }, status: 200
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

const prepareReadAlbums = ({
    dataReq: {
        _id
    },

    params: {
        band
    },
}) => {

    return {
        _id,
        band
    }
}

const readAlbums = async (data) => {

    let response;

    try {
        console.log(data);
        const bandById = await Band.findById(data.band).populate('albums');

        response = {
            json: {
                message: 'Read albums successfully!',
                albums: bandById.albums
            }, status: 200
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in read albums!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

const prepareReadAlbum = ({
    dataReq: {
        _id
    },
    params: {
        album
    },
}) => {

    return {
        album,
        _id
    }
}

const readAlbum = async (data) => {

    let response;

    try {

        const albumById = await Album.findById(data.album).populate('musics');

        response = {
            json: {
                message: 'Read album successfully!',
                album: albumById
            }, status: 200
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in read album!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

const prepareUpdateAlbum = ({
    dataReq: {
        _id
    },
    params: {
        album
    },
    body: {
        name
    }
}) => {

    return {
        _id,
        album,
        name
    }
}

const updateAlbum = async (data) => {

    let response;

    try {

        const albumById = await Album.findById(data.album);

        albumById.name = data.name;

        await albumById.save();

        response = {
            json: {
                message: 'Update album successfully!',
                album: albumById
            }, status: 200
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in update album!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

module.exports = {
    createAlbum,
    prepareCreateAlbum,
    readAlbums,
    prepareReadAlbums,
    readAlbum,
    prepareReadAlbum,
    updateAlbum,
    prepareUpdateAlbum
};