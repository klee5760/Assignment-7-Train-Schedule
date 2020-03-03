// 1. Initialize Firebase
var config = {
    apiKey : "AIzaSyB0fWuqKVFbqyw7ImOAuWFed77gTCX7rUE",
    authDomain : "amtrak-schedule.firebaseio.com/",
    databaseURL: "https://amtrak-schedule.firebaseio.com/"    
};

firebase.initializeApp(config);
var database = firebase.database();