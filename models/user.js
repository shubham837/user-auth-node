'use strict'


//const pool = require('../db/config').pool
/*
const sql = require('sql');

var User = sql.define({
  name: 'users',
  columns: [
    'id',
    'username',
    'firstname',
    'lastname',
    'password',
    'mobile',
    'is_active',
    'created_at'
  ]
});


User.createUsers = function createUsers(newUsers) {

    newUsers.forEach( newUser => {
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password,salt, function (err, hash) {
                newUser.password = hash;
            });
        })
    });

    try{
        var query = User.insert(newUsers).returning(User.id).toQuery();
        console.log(query);
        let {rows} = pool.query(query);
        console.log(rows);
      } catch (e) {
        console.error(e);
      } finally {
        client.end();
      }

}

User.getUsers = function getUsers() {

    try{
        var query = User.select().returning().toQuery();
        console.log(query);
        let {rows} = pool.query(query);
        console.log(rows);
      } catch (e) {
        console.error(e);
      } finally {
        client.end();
      }

}

User.getUserById = function getUserById(userId){
        try{
            var query = User.select(userId).returning().toQuery();
            console.log(query);
            let {rows} = pool.query(query);
            console.log(rows);
          } catch (e) {
            console.error(e);
          } finally {
            client.end();
          }
}
*/


const User = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: Sequelize.STRING, allowNull: false},
        password: {type: Sequelize.STRING},
        firstname: {type: Sequelize.STRING},
        lastname: {type: Sequelize.STRING},
        mobile: {type: Sequelize.INTEGER},
        is_active: {type: Sequelize.BOOLEAN},
        created_at: {type: Sequelize.DATE, field: 'created_at'},
        updated_at: {type: Sequelize.DATE, field: 'updated_at'}
    },{
          timestamps: false
      });
    return User
}


module.exports = User

