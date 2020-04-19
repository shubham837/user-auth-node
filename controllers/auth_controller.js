'use strict'

var User = require('../models').user

const login = (request, response) => {
  let username = request.body.username
  let password = request.body.password
  User.findAll({ where: {"username": username } })
    .then(data => {
      if(data.length < 1 || bcrypt.compare(password, data[0].password) == false){
        response.status(403).json({
            "status": "FAILED",
            "message": "Username or password not matched"
        })
      }else{
        response.status(200).json({
            "status": "SUCCESS",
            "message": "Login Successful"
        });
      }
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while login user"
      });
    });
}

const logout = (request, response) => {
  let username = request.body.username
  User.findAll({ where: {"username": username } })
    .then(data => {
      if(data.length < 1){
        response.status(403).json({
            "status": "FAILED",
            "message": "Username not matched"
        })
      }
      else{
              response.status(200).json({
                  "status": "SUCCESS",
                  "message": "Logout Successful"
              });
      }
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while login user"
      });
    });
}

module.exports = {
    login,
    logout
}