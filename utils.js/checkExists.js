const db = require('../db/connection')
const format = require('pg-format');

exports.checkExists = (table, column, value) => {

  const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column);
  return db.query(queryStr, [value])
  .then(results => {
    if (!results.rows.length) {
        return Promise.reject({ status: 404, msg: 'Resource not found' });
      }
  })

  
};