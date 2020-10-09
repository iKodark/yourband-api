var AWS = require("aws-sdk");

const S3Client = require("aws-sdk/clients/s3")

const bucketName="yourband"

const upload = async (data) => {

    let response;

    try {
        async function uploadToS3 (attachmentId, data, mimetype, fileName) {
            const params = {
             Bucket: bucketName,
             Key: attachmentId,
             Body: data,
             ContentType: mimetype,
             Metadata: {
              fileName
             }
            }
            // Upload to S3
            return s3.upload(params).promise()
            
           }
      


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
s3 = new S3Client();
        var bucketParams = {
            Bucket: bucketName,
            MaxKeys: 20,
            Delimiter: "/",
            Prefix: path,
          };
          
          // Lista Objetos do Bucket
          return s3.getObject(bucketParams);
    


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