const AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');

const bucketName="yourband";

const uploadS3 = async (data) => {

    let response;

    try {
        const { originalname, buffer } = data.file;

        AWS.config.update({
            accessKeyId: "AKIAJXPSONVQG2LSGBJA",
            secretAccessKey: "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"
        });
        const s3 = new AWS.S3();
        
        const params = {
            Bucket: bucketName,
            Body : buffer,
            Key : originalname
        };

        s3.upload(params, function (err, data) {
            //handle error
            if (err) {
                console.log("Error", err);
            }

            //success
            if (data) {
                console.log("Uploaded in:", data.Location);
            }
        });

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

const upload = async (data) => {

   
    var params = {
        Bucket: bucketName,
        Key: data.name,
        Body: data.path,
        
       }

    
    let response;
    //console.log(data);
    try {
       
      const up = s3.upload(params,(response,data)); 
           console.log(up);
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
        const s3 = new S3Client();
        const bucketParams = {
            Bucket: bucketName,
            MaxKeys: 20,
            Delimiter: "/",
            Prefix: path,
          };
          
          // Lista Objetos do Bucket
        //   return s3.getObject(bucketParams);
    


        response = {
            json: {
                data: s3.getObject(bucketParams),
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
    read,
    uploadS3
};