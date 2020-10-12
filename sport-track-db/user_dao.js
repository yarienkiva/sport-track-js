var db = require('./sqlite_connection');
var User = require('./model/User');
var UserDAO = function(){
    
    this.insert = function(user, callback){
        stmt = db.prepare("INSERT INTO Users (email, password, last_name, first_name, birthday, gender, height, weight) VALUES (?,?,?,?,?,?,?,?)");
        stmt.run(user.email, user.password, user.last_name, user.first_name, user.birthday, user.gender, user.weight);
        stmt.finalize();
        callback();
    };

    this.update = function(user, callback){
        stmt = db.prepare("UPDATE Users SET password=?, last_name=?, first_name=?, birthday=?, gender=?, height=?, weight=? WHERE email=?;");
        stmt.run(user.password, user.last_name, user.first_name, user.birthday, user.gender, user.weight, user.email);
        stmt.finalize();
        callback();
    };

    this.delete = function(user, callback){
        stmt = db.prepare("DELETE FROM Users WHERE email=?");
        stmt.run(user.email);
        stmt.finalize();
        callback();
    };

    this.findAll = function(callback){
        db.all("SELECT * FROM Users ORDER BY email", [], function(err, rows) {
            callback(err, rows);
        });
    };

    this.findByKey = function(user, callback){
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