'use strict'

const mongoosee = require('mongoose')
const {db: {host,name,port}} = require("../configs/config.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`


class Database {

    constructor(){
        this.connect();
    }

    connect(type = "mongodb"){
        if(true){
            mongoosee.set('debug',true);
            mongoosee.set('debug',{color : true})
        }
        mongoosee.connect(connectString).then(_ => console.log(`connect mongodb success`))
        .catch(err => console.log(err));
    }

    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}


const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;
