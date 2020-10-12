var db = require('./sqlite_connection');

var ActivityDAO = function(){
    
    this.insert = function(act, callback){
        let query = "INSERT INTO Activities (emailUser, date, description, distanceTotal, duration, startHour, endHour, cardioFreqMin, cardioFreqMax, cardioFreqAvg) VALUES (?,?,?,?,?,?,?,?,?,?);";
        db.run(
            query,
            [act.emailUser, act.date, act.description, act.distanceTotal, act.duration, act.startHour,
                act.endHour, act.cardioFreqMin, act.cardioFreqMax, act.cardioFreqAvg],
            callback
        );
    };

    this.update = function(act, callback){
        let query = "UPDATE Activities SET emailUser=?, date=?, description=?, distanceTotal=?, duration=?, startHour=?, endHour=?, cardioFreqMin=?, cardioFreqMax=?, cardioFreqAvg=? WHERE actId=?;";
        db.run(
            query,
            [act.emailUser, act.date, act.description, act.distanceTotal, act.duration, act.startHour,
                act.endHour, act.cardioFreqMin, act.cardioFreqMax, act.cardioFreqAvg, act.actId],
            callback
        );
    };

    this.delete = function(activity, callback){
        let query = "DELETE FROM Activities WHERE actId=?;";
        db.run(query, [activity.actId], callback);
    };

    this.findAll = function(callback){
        let query = "SELECT * FROM Activities ORDER BY actId;";
        db.all(query, callback);
    };

    this.findByKey = function(actId, callback){
        let query = "SELECT * FROM Activities WHERE actId=?;";
        db.all(query, [actId], callback);
    };
};

var dao = new ActivityDAO();
module.exports = dao;