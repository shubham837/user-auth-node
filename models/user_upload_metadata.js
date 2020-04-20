'use strict'

var sequelize = require('sequelize');
const UserUploadMetadata = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const UploadMetadata = sequelize.define('users', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.String},
        url: {type: Sequelize.String},
        created_by: {type:Sequelize.String}
        created_at: {type: Sequelize.DATE, field: 'created_at'},
        updated_at: {type: Sequelize.DATE, field: 'updated_at'}
    },{
          timestamps: false
      });
    return UploadMetadata;
}


module.exports = UserUploadMetadata