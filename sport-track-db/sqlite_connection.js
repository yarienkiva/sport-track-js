const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./sport-track.db', (err) => {
  if (err) {
  	console.log('Couldn`t connect to db.');
    return console.error(err.message);
  }
});

module.export = db;
