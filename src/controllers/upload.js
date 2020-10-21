const AWS = require('aws-sdk');

const bucketName='yourband';
const accesskey='AKIAINWXYSMZDUE2WCWA';
const accesskeysecret='hCk0tWLPG/ktxRQkFacmzSVmcA3NzfDGI+Xj0Csv';
const region='sa-east-1';

const s3 = new AWS.S3({
    accessKeyId: accesskey,
secretAccessKey: accesskeysecret,
Bucket:bucketName,
region:region,
apiVersion:'2012-10-17'
});

//console.log(s3);

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