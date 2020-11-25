const AWS = require("aws-sdk");
const bucketName="yourband";

const upload = (buffer, path) => {

    return new Promise((resolve, reject) => {

        AWS.config.update({
            accessKeyId: "AKIAJXPSONVQG2LSGBJA",
            secretAccessKey: "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"
        });
        const s3 = new AWS.S3();
        
        const params = {
            Bucket: bucketName,
            Body : buffer,
            Key : path,
            ACL:'public-read'
        };

        s3.upload(params, function (err, data) {
            //handle error
            if (err) {
                console.log("Error", err);
                reject(err);
            }

            //success
            if (data) {
                // console.log("Uploaded in:", data);
                resolve(data);
            }
        });
    });
    
}

module.exports = upload;