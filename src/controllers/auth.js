const User = require('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { ConnectionStates } = require('mongoose');

const prepareSignup = ({
    body: {
        name,
        email,
        password,
        username
    }
}) => {
    return {
        name,
        email,
        password,
        username
    }
}

function TokenGenerate(user){
    
    return jwt.sign(user, process.env.SECRET, {
        expiresIn: 86400
    });
}

const signUp = async (data) => {

    let response;

    try {

        if (await User.findOne({ email: data.email })){

            response = {
                json: {
                    message: 'User already exists!',
                }, status: 400
            }
        }else{

            var user = await User.create(data);
            user.password = undefined;
            
            response = {
                json: {
                    message: 'User successfully created!',
                    data: {
                        user,
                        token: TokenGenerate(user.toJSON())
                    }
                }, status: 200
            }
        }

    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error registering user!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

const prepareSignin = ({
    body: {
        login,
        password
    }
}) => {
    return {
        login,
        password
    }
}

const signin = async (data) => {

    let response;
    try {

        const user = await User.findOne({
            $or:[ {'email': data.login}, {'username': data.login} ]
        }, {
            password: 1, id: 1, email: 1, username: 1
        });

        if(user) {
            
            var auth = (await bcrypt.compare(data.password, user.password));
        }

        if(user) {

            var token = jwt.sign(user.toJSON(), process.env.SECRET, {
                expiresIn: 86400
            });
        }

        if(auth && token) {
            data = {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    name: user.name
                },
                token
            };
            response = {
                json: {
                    message: 'Successfully authenticated user!',
                    data
                }, status: 200
            }
        }else{

            response = {
                json: {
                    message: 'Unregistered user!'
                }, status: 400
            }
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error authenticated user!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

module.exports = {
    signUp,
    prepareSignup,
    signin,
    prepareSignin
};