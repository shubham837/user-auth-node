const pool = require('./config').pool

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS user
  (id SERIAL PRIMARY KEY,
  username VARCHAR(256) UNIQUE NOT NULL,
  firstname VARCHAR(2560),
  lastname VARCHAR(256),
  password VARCHAR(256),
  mobile INTEGER,
  is_active BOOLEAN
  created_on DATE NOT NULL)`;

  pool.query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS user';
  pool.query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();

};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


export {
  createAllTables,
  dropAllTables,
};

require('make-runnable');