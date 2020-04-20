'use strict'

var User = require('../models').user
var bcrypt = require('bcrypt')
var user_upload_metadata_service = require('../services/user_upload_metadata_service')
var randomstring = require("randomstring");
var validations = require('../helpers/validations')
var status = require('../helpers/status').status

const getUsers = (request, response) => {
  let condition = request.query.condition
  User.findAll({ where: condition })
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


const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  User.findByPk(id)
    .then(data => {
      response.status(200).json(data);
    })
    .catch(err => {
      response.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
}

const getUserDetail = (request, response) => {
  if(request.session.loggedin){
    let username = request.session.username;
    User.findAll({ where: {"username": username } })
        .then(data => {
          if(data.length < 1 ){
            response.status(403).json({
                "status": "FAILED",
                "message": "Invalid User"
            })
          }else{
            data.password = undefined;
            response.status(200).json(data);
          }
        })
        .catch(err => {
          response.status(500).send({
            message:
              err.message || "Some error occurred while login user"
          });
        });
  } else {
     response.status(403).json({
          "status": "FAILED",
          "message": "Invalid User"
     })
  }
}

const createUser = (request, response) => {
    let user = request.body

    if(validations.validatePassword(user.password) == false){
        response.status(status.bad).send({
            message: "Weak Password"
        })
    }

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function (error, hash) {
            user.password = hash;
        });
    });

    User.create(user)
        .then(data => {
          response.status(200).json(data);
        })
        .catch(err => {
          response.status(500).send({
            message:
              err.message || "Some error occurred while creating the Users."
          });
        });
}

const bulkCreateUser = (request, response) => {
    let users = request.body
    users.forEach( newUser => {
            if(validations.validatePassword(user.password) == false){
                response.status(status.bad).send({
                    message: "Weak Password for user"
                })
            }
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password, salt, function (error, hash) {
                    newUser.password = hash;
                });
            })
    });

    User.bulkCreate(users)
        .then(data => {
          user_upload_metadata_service.uploadFile(data, randomstring.generate());
          response.status(200).json(data);
        })
        .catch(err => {
          response.status(500).send({
            message:
              err.message || "Some error occurred while creating the Users."
          });
        });

}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  bulkCreateUser,
  getUserDetail
}