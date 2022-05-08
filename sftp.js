require("dotenv").config();
const Client = require('ssh2-sftp-client');

class SFTP {

    constructor(host, port, username, password) {

        this.config = {
            host: host,
            port: port,
            username: username,
            password: password
        }

        this.sftp = new Client();
    }

    async connect(){
        try {
            return await this.sftp.connect({
                host: this.config.host,
                port: this.config.port,
                username: this.config.username,
                password: this.config.password
            });
        } catch(err){
            return err;
        }
    }

    async list(sftpPath){
        try {
            await this.connect();
            const responsePayload = await this.sftp.list(sftpPath);
            await this.sftp.end();
            return responsePayload;
        } catch(err){
            return err;
        }
    }

    async mkdir(destPath){
        try {
            await this.connect();
            const created = await this.sftp.mkdir(destPath, true);
            await this.sftp.end();
            return created;
        } catch(err){
            return err;
        }
    }

    async put(uploadPath, destPath){
        try {
            await this.connect();
            const responsePayload =await this.sftp.put(uploadPath, destPath);
            await this.sftp.end();
            return responsePayload;
        } catch(err){
            return err;
        }
    }
}

module.exports = SFTP;