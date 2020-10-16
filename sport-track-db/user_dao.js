var db = require('./sqlite_connection');

var UserDAO = function() {
    
    /**
     * Insert un utilisateur
     * @param  {User}   user
     */
    this.insert = (user, callback) => {
        let query = "INSERT INTO Users (email, password, last_name, first_name, birthday, gender, height, weight) VALUES (?,?,?,?,?,?,?,?);";
        db.run(
            query,
            [user.email, user.password, user.last_name, user.first_name, user.birthday, user.gender, user.height, user.weight],
            callback
        );
    };

    /**
     * Update un utilisateur
     * @param  {User}   user
     */
    this.update = (user, callback) => {
        let query = "UPDATE Users SET password=?, last_name=?, first_name=?, birthday=?, gender=?, height=?, weight=? WHERE email=?;";
        db.all(
            query,
            [user.password, user.last_name, user.first_name, user.birthday, user.gender, user.height, user.weight, user.email],
            callback
        );
    };

    /**
     * Supprime un utilisateur
     * @param  {User}   user
     */
    this.delete = (user, callback) => {
        let query = "DELETE FROM Users WHERE email=?;";
        db.run(query, [user.email], callback);
    };

    /**
     * Retourne tous les utilisateurs
     * @param  {User}   user
     */
    this.findAll = (callback) => {
        let query = "SELECT * FROM Users ORDER BY email;";
        db.all(query, [], callback);
    };

    /**
     * Retourne un utilisateur en fonction de son mail
     * @param  {User}   user
     */
    this.findByKey = (email, callback) => {
        let query = "SELECT * FROM Users WHERE email=?;";
        db.all(query, [email], callback);
    };
        
};
var dao = new UserDAO();
module.exports = dao;