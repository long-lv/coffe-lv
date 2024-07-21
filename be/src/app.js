require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression"); 
const app = express();
// init middeware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))


// init db
require('./dbs/init.mongob');


// init router
app.use('',require('./routes'));



//handle error



module.exports = app;