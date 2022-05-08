require("dotenv").config();
const Database = require("./database");

class Authentication {

    constructor(username, token) {
        this.data = { username: username, token: token }
    }

    async check(){
        try {
            const { username, token } = this.data;
            const check = await new Database().findOne({"username": username, "token": token});

            return !(check?.username !== username || check?.token !== token);


        } catch(err){
            return false;
        }
    }
}

module.exports = Authentication;