var db = require('./sqlite_connection');
var ActivityDAO = function(){
    
    this.insert = function(activity, callback){
        stmt = db.prepare("INSERT INTO Activities (emailUser, date, description, distanceTotal, duration, startHour, endHour, cardioFreqMin, cardioFreqMax, cardioFreqAvg) VALUES (?,?,?,?,?,?,?,?,?,?)");
        stmt.run(activity.emailUser, activity.date, activity.description, activity.distanceTotal, activity.duration, activity.startHour, activity.endHour, activity.cardioFreqMin, activity.cardioFreqMax, activity.cardioFreqAvg);
        stmt.finalize();
        callback();
    };

    this.update = function(activity, callback){
        stmt = db.prepare("UPDATE Activities SET emailUser=?, date=?, description=?, distanceTotal=?, duration=?, startHour=?, endHour=?, cardioFreqMin=?, cardioFreqMax=?, cardioFreqAvg=? WHERE actId=?;");
        stmt.run(activity.emailUser, activity.date, activity.description, activity.distanceTotal, activity.duration, activity.startHour, activity.endHour, activity.cardioFreqMin, activity.cardioFreqMax, activity.cardioFreqAvg, activity.actId);
        stmt.finalize();
        callback();
    };

    this.delete = function(activity, callback){
        stmt = db.prepare("DELETE FROM Activities WHERE actId=?");
        stmt.run(activity.actId);
        stmt.finalize();
        callback();
    };

    this.findAll = function(callback){
        db.all("SELECT * FROM Activities ORDER BY actId", [], function(err, rows) {
            callback(err, rows);
        });
    };

    this.findByKey = function(activity, callback){
        db.all("SELECT * FROM Activities WHERE actId=?", [activity.actId], function(err, rows) {
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

var dao = new ActivityDAO();
module.exports = dao;

/*

CREATE TABLE IF NOT EXISTS Activities (
    actId INTEGER PRIMARY KEY AUTOINCREMENT,

    emailUser VARCHAR2(255) NOT NULL,
    FOREIGN KEY (emailUser) REFERENCES users(emailUser),

    date TEXT NOT NULL,

    description VARCHAR2(255) NOT NULL,

    distanceTotal FLOAT
        CHECK (distanceTotal >= 0),
    
    duration TEXT,
    
    startHour TEXT,

    endHour TEXT,

    cardioFreqMin INTEGER(3)
        CHECK (cardioFreqMin BETWEEN 0 AND 250),
    
    cardioFreqMax INTEGER(3)
        CHECK (cardioFreqMax BETWEEN 0 AND 250),
    
    cardioFreqAvg INTEGER(3)
        CHECK (cardioFreqAvg BETWEEN 0 AND 250),
    
);

*/
