var db = require('./sqlite_connection');

var ActivityEntryDAO = function(){
    
    /**
     * Insert une donnée d'activité
     * @param  {[ActivityEntry]}   actEntry 
     */
    this.insert = (actEntry, callback) => {
        let query = "INSERT INTO ActivitiesData (activityId, hour, cardioFreq, latitude, longitude, altitude) VALUES (?,?,?,?,?,?);";
        db.run(
            query,
            [actEntry.activityId, actEntry.hour, actEntry.cardioFreq, actEntry.latitude, actEntry.longitude, actEntry.altitude],
            callback
        );
    };

    /**
     * Update une donnée d'activité
     * @param  {[ActivityEntry]}   actEntry 
     */
    this.update = (actEntry, callback) => {
        let query = "UPDATE ActivitiesData SET activityId=?, hour=?, cardioFreq=?, latitude=?, longitude=?, altitude=? WHERE dataId=?;";
        db.run(
            query,
            [actEntry.activityId, actEntry.hour, actEntry.cardioFreq, actEntry.latitude, actEntry.longitude, actEntry.altitude, actEntry.dataId],
            callback
        );
    };

    /**
     * Supprime une donnée d'activité
     * @param  {[ActivityEntry]}   actEntry 
     */
    this.delete = (actEntry, callback) => {
        let query = "DELETE FROM ActivitiesData WHERE dataId=?;";
        db.run(
            query,
            [actEntry.dataId],
            callback
        );
    };

    /**
     * Retourne toutes les données d'activité
     * @param  {[ActivityEntry]}   actEntry 
     */
    this.findAll = (callback) => {
        let query = "SELECT * FROM ActivitiesData ORDER BY dataId;";
        db.all(
            query,
            [],
            callback
        );
    };

    /**
     * Retourne les données d'une activité
     * @param  {[ActivityEntry]}   actEntry 
     */
    this.findByKey = (actEntryId, callback) => {
        let query = "SELECT * FROM ActivitiesData WHERE dataId=?;";
        db.all(
            query,
            [actEntryId],
            callback
        );
    };
};

var dao = new ActivityEntryDAO();
module.exports = dao;