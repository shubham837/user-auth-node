require('dotenv').config()

/*
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'



const databaseConfig = { connectionString: process.env.DATABASE_URL };

const pool = new Pool(databaseConfig)

pool.connect().then(() => console.log('DB connected successfully'))
              .catch(err => console.error('connection error', err.stack))

module.exports = { pool }
*/

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  operatorsAliases: false,
  dialect: 'postgres',
  dialectOptions: {ssl: true},
  pool: {
    max: 5,
    min: 2,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize