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
//Đoạn mã này tạo ra một middleware để xử lý các yêu cầu không khớp với bất kỳ route nào được định nghĩa trước đó.
//Nó tạo ra một đối tượng lỗi với thông điệp "Not Found" và thiết lập status code là 404, sau đó chuyển lỗi này đến 
//middleware xử lý lỗi bằng cách gọi next(error).
app.use((req,res,next) =>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

// ham xu ly loi

app.use((err, req, res, next) =>{
    const statusCode = err.status || 500
    return res.status(statusCode).json({
        status : "error",
        code : statusCode,
        message : err.message || "Internal Server Error"
    })
})


module.exports = app;