const express = require('express');
const bodyParse = require("body-parser");
const app = express();
const tools = require("../public/javascripts/tools");

app.get("/", function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "Project" : "Real time weather processor" ,
        "description" : "Final Sem project by Harshith HM (14BEC0393)" ,
        "request" : "Send POST request to /upload to upload weather data to FireStore"
    }))
});

