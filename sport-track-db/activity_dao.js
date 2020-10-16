var db = require('./sqlite_connection');

var ActivityDAO = function(){
    
    /**
     * Insert l'activité
     * @param  {Activity}   act
     */
    this.insert = (act, callback) => {
        let query = "INSERT INTO Activities (emailUser, date, description, distanceTotal, duration, startHour, endHour, cardioFreqMin, cardioFreqMax, cardioFreqAvg) VALUES (?,?,?,?,?,?,?,?,?,?);";
        db.run(
            query,
            [act.emailUser, act.date, act.description, act.distanceTotal, act.duration, act.startHour,
                act.endHour, act.cardioFreqMin, act.cardioFreqMax, act.cardioFreqAvg],
            callback
        );
    };

    /**
     * Update une activité
     * @param  {Activity}   act
     */
    this.update = (act, callback) => {
        let query = "UPDATE Activities SET emailUser=?, date=?, description=?, distanceTotal=?, duration=?, startHour=?, endHour=?, cardioFreqMin=?, cardioFreqMax=?, cardioFreqAvg=? WHERE actId=?;";
        db.run(
            query,
            [act.emailUser, act.date, act.description, act.distanceTotal, act.duration, act.startHour,
                act.endHour, act.cardioFreqMin, act.cardioFreqMax, act.cardioFreqAvg, act.actId],
            callback
        );
    };

    /**
     * Supprime une activité
     * @param  {Activity}   act
     */
    this.delete = (activity, callback) => {
        let query = "DELETE FROM Activities WHERE actId=?;";
        db.run(query, [activity.actId], callback);
    };

    /**
     * Retourne toutes les activité
     * @param  {Activity}   act
     */
    this.findAll = (callback) => {
        let query = "SELECT * FROM Activities ORDER BY actId;";
        db.all(query, callback);
    };

    /**
     * Retourne les activités d'un utilisateur
     * @param  {Activity}   act
     */
    this.findByKey = (actId, callback) => {
        let query = "SELECT * FROM Activities WHERE emailUser=?;";
        db.all(query, [actId], callback);
    };

};

var dao = new ActivityDAO();
module.exports = dao;