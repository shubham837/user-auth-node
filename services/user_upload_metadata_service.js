'use strict'

const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config()
var UserUploadMetadata = require('../models').user_upload_metadata



const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
});


const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_S3_BUCKET_REGION
    }
};


const saveMetadata = (data, fileName) => {
    var metadata = {
        "name": fileName,
        "url": data.Location
    }
    UserUploadMetadata.create(metadata)
        .then(x => {
            console.log("Metadata saved successfully")
        })
        .catch(err => {
            console.log("Error in saving metadata")
        });

}

const uploadFile = (userData, fileName) => {
    // Read content from the file
    // const fileContent = fs.readFileSync(fileName);

    let fileContent = []

    userData.forEach(element => {
        fileContent.push({'username': element.username, 'is_active': element.is_active});
    })

    params.key = fileName
    params.Body = fileContent

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        saveMetadata(data, fileName);
    });
};

module.exports = uploadFile