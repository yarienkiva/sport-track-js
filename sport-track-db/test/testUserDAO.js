const sport_track = require('../sport-track-db');
const User = require('../models/User');

var user_dao = sport_track.user_dao;

// email,password,last_name,first_name,birthday,gender,height,weight
var user1 = new User("bob@protonmail.com", "passw0rd", "alice", "bob", "01/01/2000", "MAN", 180, 80);
// console.log(user1);

// INSERT
user_dao.insert(user1, (err) => {
    if (err) {
        console.log("Error: " + err.message);
    } else {
        console.log("User inserted !");


        // UPDATE
        user1.password = "MY_NEW_PASSW0RD";
        user_dao.update(user1, (err) => {
            if (err) {
                console.log("Error: " + err.message);
            } 
            else {
                console.log("User updated !");

                // FIND ALL
                console.log("DISPLAY THE USER DATABASE:")
                user_dao.findAll((err, rows) => {
                    if (err) { 
                        console.log(err.message);
                    } else {
                        console.log(rows);
                        
                        // FIND BY KEY
                        console.log("FIND ONLY ONE USER:")
                        user_dao.findByKey(user1.email, (err, rows) => {
                            if (err) {
                                console.log(err.message);
                            } else {
                                console.log(rows);}

                                // DELETE USER
                                user_dao.delete(user1, (err) => {
                                    if (err) console.log(err.message);
                                    else console.log("User deleted !");
                                });
                        });

                    }
                });

            }
        });

    }
});