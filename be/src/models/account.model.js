'use strict'
const {model,Schema,Types} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "Account"
const COLLECTION_NAME = "Accounts"
// Declare the Schema of the Mongo model
var accountSchema = new Schema({
    name:{
        type:String,
        trim : true,
        maxLength: 40,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        trim : true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum : ['active','inactive'],
        default : 'inactive'
    },
    verify : {
        type : Boolean,
        default : false
    },
    roles:{
        type : Array,
        default : []
    }
},
    {
        timestamps : true,
        collection : COLLECTION_NAME
    }
);

//Export the model
module.exports = model(DOCUMENT_NAME, accountSchema);