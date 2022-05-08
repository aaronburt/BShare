require("dotenv").config();

class Logger {
    constructor(debug = process.env.logging) {
        this.debug = (debug === "true");
    }

    print(data){
        /* debug must be set to true before text will be console logged. */
        if(this.debug) console.log(data);
    }
}

module.exports = Logger;