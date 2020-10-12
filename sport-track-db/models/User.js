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

    toString() {
        return `| U -> ${this.email}:${this.password} | ${this.first_name} ${this.last_name} |`;
    }
}

module.exports = User;