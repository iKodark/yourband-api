import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

AWS.config.update({region:'REGION'});

s3 = new S3({apiVersion:'2006-03-01'});



function listaBucket(data){
s3.listBuckets(function(err,data){
    if(err){
        console.log("ERRO: ",err);
    }else{
        console.log("Sucesso",data.Buckets)
    }
});
}

function CreateBucket(data){
    var bucketParam ={
        Bucket: process.argv[2]
    };
    s3.CreateBucket(bucketParam,function(err,data){
        if(err){
            console.log("ERRO: ",err);
        }else{
            console.log("OK",data.Location);
        }
    });
}

function upfile(file){
    var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
var file = process.argv[3];

// Configura o arquivo para leitura e Obtem os parametros
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('Erro no Arquivo', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

// Sobe arquivo para o Bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload OK", data.Location);
  }
});
}
function ListObject(data){
    
var bucketParams = {
    Bucket : 'BUCKET_NAME',
  };
  
  // Lista Objetos do Bucket
  s3.listObjects(bucketParams, function(err, data) {
    if (err) {
      console.log("Erro:", err);
    } else {
      console.log(data);
    }
  });
}
