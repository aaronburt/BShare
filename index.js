require("dotenv").config();
const { sftp_host, sftp_port, sftp_username, sftp_password, sftp_directory } = process.env;

const { randomBytes } = require("crypto");
const Authentication = require("./authentication");
const Logger = require("./log");
const Database = require("./database");
const express = require("express");
const upload = require("./multer");
const SFTP = require("./sftp");
const fs = require("fs");

const app = express();
const Log = new Logger();

/* Anything inside the public directory doesn't require authentication to visit */
app.use(express.static(__dirname + '/public'));

app.use(async(req, res, next) => {
    try {

        const { username, token } = req.query;
        if(!await new Authentication(username, token).check()) return res.sendStatus(400);
        next();

    } catch(err){
        Log.print(err);
        return res.sendStatus(401);
    }
})

app.get("/sftp", async(req, res) => {
    try {
        const sftp = await new SFTP(sftp_host, sftp_port, sftp_username, sftp_password);
        await sftp.connect();

        res.send(await sftp.list(sftp_directory));
    } catch(err){
        res.sendStatus(400);
    }
})

app.post("/upload", upload.single('object'), async(req, res) => {
    try {
        Log.print(req.file);

        const sftp = await new SFTP(sftp_host, sftp_port, sftp_username, sftp_password);
        await sftp.connect();

        const newDir = randomBytes(4).toString('hex');
        Log.print(newDir);

        await sftp.mkdir(`${sftp_directory}${newDir}`);
        await sftp.put(req.file.path, `${sftp_directory}${newDir}/${req.file.originalname}`);
        fs.unlinkSync(req.file.path);

        return res.redirect(`https://share.streamsave.xyz/${newDir}/${req.file.originalname}`);
   } catch(err){
        return err;
   }
});

app.get("*", (req, res) => { return res.sendStatus(200); });
const listener = app.listen(process.env.express_port, ()=>{ console.log(`[Express]: started on port ${listener.address().port}`); });