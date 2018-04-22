const fireBase = require("firebase");
require("firebase/firestore");

module.exports = {

    getFireStore: function () {

        var fireStoreConfig = {
            apiKey: "AIzaSyDGG8ZsSkDlO6uBf2vM_bqG9YwW88nGG3k",
            authDomain: "weatherprocessor.firebaseapp.com",
            databaseURL: "https://weatherprocessor.firebaseio.com",
            projectId: "weatherprocessor",
            storageBucket: "weatherprocessor.appspot.com",
            messagingSenderId: "190735174214"
        };

        fireBase.initializeApp(fireStoreConfig);
        return fireBase.firestore();
    } , 
    
    sendToFireStore: function (db, tempData, callback) {
        var datetime = new Date();
        var weatherRef = db.collection("weatherData");
        var data = {
          "temp": parseFloat(tempData),
          "time": datetime , 
          "location": "Vellore, Tamilnadu"
        };
        weatherRef.doc(datetime.toString()).set(data);
        callback({
            "Task" : "To upload temperature data to cloud FireStore",
            "Status" : "Success",
            "TimeStamp" : datetime
        });
    } , 
    
    getRecentUploads: function (db, callback) {
        var weatherRef = db.collection("weatherData");
        var data = {
            temperature: []
        };

        var recentFilter = weatherRef.orderBy('time', 'desc').limit(5)
            .get()
            .then(function (docs)
            {
                docs.forEach(function (doc) {
                    data.temperature.push(doc.data());
                })
                callback(data);
            })
    }

};
