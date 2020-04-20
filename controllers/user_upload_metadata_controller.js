'use strict'

var UserUploadMetadata = require('../models').user_upload_metadata

const getUserUploadMetadata = (request, response) => {
  let condition = request.query.condition
  UserUploadMetadata.findAll({ where: condition })
    .then(data => {
      response.status(200).json(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
}

module.exports = {
    getUserUploadMetadata
}