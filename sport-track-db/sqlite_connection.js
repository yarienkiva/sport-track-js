const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./sport-track.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

module.exports = db;