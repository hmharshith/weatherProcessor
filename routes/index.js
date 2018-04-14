const express = require('express');
const bodyParse = require("body-parser");
const app = express();
const tools = require("../public/javascripts/tools");

var db = tools.getFireStore();

app.get("/", function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send({
        "Project" : "Real time weather processor \n" ,
        "description" : "Final Sem project by Harshith HM (14BEC0393) \n" ,
        "request" : "Send POST request to /upload to upload weather data to FireStore \n"
    })
});


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