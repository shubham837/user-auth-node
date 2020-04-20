//const dbConfig = require("../db/db.config.js");

const sequelize = require("../db/config")
const Sequelize = require("sequelize");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_upload_metadata = require("./user_upload_metadata")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);

module.exports = db;
