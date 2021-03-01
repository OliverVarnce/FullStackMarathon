module.exports = class Model {
    constructor(user_name, login, user_email, hash_pass) {
        this.user_name = user_name;
        this.login = login;
        this.user_email = user_email;
        this.hash_pass = hash_pass;
    }


}