'use strict'

const UserUploadMetadata = (sequelize, Sequelize) => {
    const UploadMetadata = sequelize.define('user_upload_metadata', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        file_name: {type: Sequelize.STRING, field: 'file_name'},
        url: {type: Sequelize.STRING},
        created_by: {type:Sequelize.STRING},
        created_at: {type: Sequelize.DATE, field: 'created_at'},
        updated_at: {type: Sequelize.DATE, field: 'updated_at'}
    },{
          timestamps: false
      });
    return UploadMetadata;
}


module.exports = UserUploadMetadata