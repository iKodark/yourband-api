const Band = require('../models/Band');
const User = require('../models/User');

const prepareCreateBand = ({
    dataReq: {
        _id
    },
    body: {
        name
    },
}) => {

    return {
        name,
        _id
    }
}

const createBand = async (data) => {

    let response;

    try {

        const band = await Band.create({
            name: data.name,
            user: data._id
        });

        await band.save();

        const userById = await User.findById(data._id).populate('bands');

        userById.bands.push(band);
        await userById.save();

        response = {
            json: {
                message: 'Band successfully created!',
                bands: userById.bands
            }, status: 200
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in create band!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

const prepareReadBands = ({
    dataReq: {
        _id
    }
}) => {

    return {
        _id
    }
}

const readBands = async (data) => {

    let response;

    try {

        const userById = await User.findById(data._id).populate('bands');

        response = {
            json: {
                message: 'Read band successfully!',
                bands: userById.bands
            }, status: 200
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in read band!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

const prepareReadBand = ({
    dataReq: {
        _id
    },
    params: {
        band
    },
}) => {

    return {
        band,
        _id
    }
}

const readBand = async (data) => {

    let response;

    try {

        const bandById = await Band.findById(data.band).populate('albums');

        response = {
            json: {
                message: 'Read band successfully!',
                band: bandById
            }, status: 200
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in read band!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

const prepareUpdateBand = ({
    dataReq: {
        _id
    },
    params: {
        band
    },
    body: {
        name
    }
}) => {

    return {
        _id,
        band,
        name
    }
}

const updateBand = async (data) => {

    let response;

    try {

        const bandById = await Band.findById(data.band);

        bandById.name = data.name;

        await bandById.save();

        response = {
            json: {
                message: 'Update band successfully!',
                band: bandById
            }, status: 200
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error in update band!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

module.exports = {
    createBand,
    prepareCreateBand,
    readBands,
    prepareReadBands,
    readBand,
    prepareReadBand,
    updateBand,
    prepareUpdateBand
};