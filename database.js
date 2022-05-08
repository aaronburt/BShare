require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

class Database {

    constructor() {
        const { atlas_username, atlas_password, atlas_database, atlas_cluster, atlas_collection } = process.env;
        this.dbCollection = atlas_collection;
        this.dbDatabase = atlas_database;
        this.uri = `mongodb+srv://${atlas_username}:${atlas_password}@${atlas_cluster}/${atlas_database}?retryWrites=true&w=majority`;
    }

    async connect(){
        try {
            this.client = await new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
            return await this.client.connect();
        } catch(err){
            return err;
        }
    }

    async closeConnection(){
        try {
            await this.client.close();
        } catch(err){
            return err;
        }
    }

    async _collection(){
        try {
            const connection = await this.connect();
            return await connection.db(this.dbDatabase).collection(this.dbCollection);
        } catch(err){
            return err;
        }
    }

    async findOne(query){
        try {
            const collection = await this._collection();
            const databaseResponse = await collection.findOne(query);
            await this.closeConnection();
            return databaseResponse;
        } catch(err){
            await this.client.close();
            return err;
        }
    }

    async findAll(query){
        try {
            const collection = await this._collection();
            const databaseResponse = await collection.find(query).toArray();
            await this.closeConnection();
            return databaseResponse;
        } catch(err){
            await this.client.close();
            return err;
        }
    }

    async insertOne(payload){
        try {
            const collection = await this._collection();
            const databaseResponse = await collection.insertOne(payload);
            await this.closeConnection();
            return databaseResponse;
        } catch(err){
            await this.client.close();
            return err;
        }
    }

    async delete(query){
        try {
            const collection = await this._collection();
            const databaseResponse = await collection.deleteOne(query);
            await this.closeConnection();
            return databaseResponse;
        } catch(err){

        }
    }
}

module.exports = Database;
