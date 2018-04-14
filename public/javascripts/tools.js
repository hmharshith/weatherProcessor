const fireBase = require("firebase");

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
    }

};