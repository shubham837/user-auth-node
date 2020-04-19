'use strict'

var User = require('../models').user

const login = (request, response) => {
  let username = request.body.username
  let password = request.body.password
  User.findAll({ where: {"username": username } })
    .then(data => {
      if(data.length < 1 || bcrypt.compare(password, data[0].password) == false){
        request.session.username = username;
        request.session.loggedin = true;
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
    if (request.session) {
        // delete session object
        request.session.destroy(function(err) {
          if(err) {
            console.log("Error in logging out")
          } else {
            response.status(200).json({
                        "status": "SUCCESS",
                        "message": "Logout Successful"
                    });
          }
        });
      }
}

module.exports = {
    login,
    logout
}