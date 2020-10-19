/**
 * Classe modèle : User
 * Contient un constructeur et une méthode toString
 */
class User {
    constructor(email,password,last_name,first_name,birthday,gender,height,weight){
        this.email = email;
        this.password = password;
        this.last_name = last_name;
        this.first_name = first_name;
        this.birthday = birthday;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
    }

    /**
     * To check if string is empty or null or undefined
     * @param  {String}  value the string to check
     * @return {Boolean}       if the string isn't valid
     */
    isEmpty(value) {
      return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
    }

    /**
     * Check if all the attributes are valid
     * @param  {User}       user the user to check
     * @return {Boolean}    if non of the user's attributes are empty
     */
    isValid() {
        return !(this.isEmpty(this.email) || this.isEmpty(this.password) || this.isEmpty(this.last_name) || 
                  this.isEmpty(this.first_name) || this.isEmpty(this.birthday) || this.isEmpty(this.gender) ||
                   this.isEmpty(this.height) || this.isEmpty(this.weight));
    }


    toString() {
        return `| U -> ${this.email}:${this.password} | ${this.first_name} ${   this.last_name} |`;
    }
}

module.exports = User;