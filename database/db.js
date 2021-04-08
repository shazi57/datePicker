const JSONdb = require('simple-json-db');
const path = require('path');
const schema = require('./schema');

const db = new JSONdb(path.join(__dirname, 'databank.json'));

//  Helper functions for database APIs
const getRecent = () => (
  new Promise((resolve) => {
    if (!db.has('recent')) {
      db.set('recent', schema(new Date()));
    }

    resolve(db.get('recent'));
  })
);

const setRecent = (date) => (
  new Promise((resolve, reject) => {
    if (typeof date !== 'object') {
      reject(new Error('data type has to be in a valid schema'));
    }

    resolve(db.set('recent', date));
  })
);

const deleteAll = () => (
  new Promise((resolve) => {
    resolve(db.delete('recent'));
  })
);

module.exports = [deleteAll, getRecent, setRecent];
