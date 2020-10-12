var db = require('./sqlite_connection');

var UserDAO = function() {
    
    this.insert = (user, callback) => {
        let query = "INSERT INTO Users (email, password, last_name, first_name, birthday, gender, height, weight) VALUES (?,?,?,?,?,?,?,?);";
        db.run(
            query,
            [user.email, user.password, user.last_name, user.first_name, user.birthday, user.gender, user.height, user.weight],
            callback
        );
    };

    this.update = (user, callback) => {
        let query = "UPDATE Users SET password=?, last_name=?, first_name=?, birthday=?, gender=?, height=?, weight=? WHERE email=?;";
        db.run(
            query,
            [user.password, user.last_name, user.first_name, user.birthday, user.gender, user.height, user.weight, user.email],
            callback
        );
    };

    this.delete = (user, callback) => {
        let query = "DELETE FROM Users WHERE email=?;";
        db.run(
            query,
            [user.email],
            callback
        );
    };

    this.findAll = (callback) => {
        let query = "SELECT * FROM Users ORDER BY email;";
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    };

    this.findByKey = (user, callback) => {
        db.all("SELECT * FROM Users WHERE email=?", [user.email], function(err, rows) {
            if(err) {
                console.err(err.message);
            } else {
                console.log("Row : " + rows);
                
                rows.forEach( function(row) {
                    console.log("Key : ("+key+") :");
                    callback(rows);
                });
            }
        });
    };
};
var dao = new UserDAO();
module.exports = dao;

/*
CREATE TABLE IF NOT EXISTS Users (
    email VARCHAR2(255)
        PRIMARY KEY
        CHECK (email LIKE "%@%.%"),

    password VARCHAR2(255) NOT NULL,
    
    last_name VARCHAR2(255) NOT NULL,
    
    first_name VARCHAR2(255) NOT NULL,
    
    birthday TEXT NOT NULL,
        -- CHECK (birthday BETWEEN DATE '1900-01-01' AND SYSDATE),

    gender VARCHAR2(5) NOT NULL
        CHECK (gender = 'WOMAN' OR gender = 'MAN' OR gender = 'OTHER'),
    
    height INTEGER NOT NULL
        CHECK (height BETWEEN 10 AND 300),

    weight INTEGER NOT NULL
        CHECK (weight BETWEEN 5 AND 300)
);

*/