const upload = async (data) => {

    let response;

    try {



        response = {
            json: {
                message: 'Upload realizado com sucesso!'
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Erro ao realizar upload!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

const read = async (data) => {

    let response;

    try {

        

        response = {
            json: {
                message: 'Leitura realizada com sucesso!'
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Erro ao realizar leitura!'
            }, status: 500
        }
    }finally {
        
        return response;
    }
}

module.exports = {
    upload,
    read
};