'use strict'

var User = require('../models').user

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


const createUser = (request, response) => {
    let user = request.body

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password,salt, function (err, hash) {
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
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password,salt, function (err, hash) {
                    newUser.password = hash;
                });
            })
    });

    User.bulkCreate(users)
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  bulkCreateUser
}