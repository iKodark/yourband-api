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

        const userById = await User.findById(data._id);

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

const prepareReadBand = ({
    dataReq: {
        _id
    }
}) => {

    return {
        _id
    }
}

const readBand = async (data) => {

    let response;

    try {

        const userById = await User.findById(data._id).populate('bands');

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

module.exports = {
    createBand,
    prepareCreateBand,
    readBand,
    prepareReadBand
};