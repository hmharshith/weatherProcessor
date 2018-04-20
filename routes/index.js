const express = require('express');
const bodyParse = require("body-parser");
const app = express();
const tools = require("../public/javascripts/tools");

var db = tools.getFireStore();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send({
        "Project" : "Real time weather processor \n" ,
        "description" : "Final Sem project by Harshith HM (14BEC0393) \n" ,
        "Your Request" : "Temperature"+req.query.temp ,
        "ToDo" : "Send POST request to /upload to upload weather data to FireStore \n"
    })
});

app.get("/upload", function(req, res){
    temp = req.query.temp;
    tools.sendToFireStore(db, temp, function (response) {

        console.log(" Temperature data uploaded for the timeStamp: " + response.TimeStamp);
        res.setHeader('Content-Type', 'application/json');
        res.send(response);
})

app.post("/upload", function (req, res) {
    temp = req.headers.temperature;
    tools.sendToFireStore(db, temp, function (response) {

        console.log(" Temperature data uploaded for the timeStamp: " + response.TimeStamp);
        res.setHeader('Content-Type', 'application/json');
        res.send(response);
    })
});

app.post("/getrecent", function (req, res) {
    
    tools.getRecentUploads(db, function (response) {

        res.setHeader('Content-Type', 'application/json');
        res.send(response);
    })
});

app.listen(process.env.PORT||3000 , function(){
    console.log("Started server !");
});
