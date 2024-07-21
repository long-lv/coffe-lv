const app = require("./src/app");
const PORT = process.env.PORT || 3066;
const server = app.listen(PORT, () =>{
    console.log('lv coffe with port', PORT);
})

process.on("SIGINT", () =>{
    server.close(() => console.log(`close sever express port ${PORT}`));

})


