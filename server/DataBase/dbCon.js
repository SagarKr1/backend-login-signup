let { MongoClient } = require('mongodb');
require('dotenv').config();

console.log(process.env.URL);
const database = process.env.DataBase;
const url = process.env.URL;


const client = new MongoClient(url);

module.exports.handler = async () => {
    try {
        const client = new MongoClient(url);
        let result = await client.connect();
        let db = await result.db(database);
        return db;
    } catch (e) {
        return e;
    }
}

module.exports.close = () => {
    try {
        client.close();
        return "db close";
    } catch (e) {
        return e;
    }
}