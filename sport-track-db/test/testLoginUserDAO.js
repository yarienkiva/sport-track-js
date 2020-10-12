const sport_track = require('../sport-track-db');
const User = require('../models/User');

var user_dao = sport_track.user_dao;

// email,password,last_name,first_name,birthday,gender,height,weight
var user1 = new User("bob@protonmail.com", "passw0rd", "alice", "bob", "01/01/2000", "MAN", 180, 80);
// console.log(user1);
        user_dao.findByKey(user1.email, (err, rows) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(rows[0]['password']);
            }
        })