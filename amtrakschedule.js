// 1. Initialize Firebase

var config = {
    apiKey : "AIzaSyB0fWuqKVFbqyw7ImOAuWFed77gTCX7rUE",
    authDomain : "amtrak-schedule.firebaseio.com/",
    databaseURL: "https://amtrak-schedule.firebaseio.com/"
    
};

firebase.initializeApp(config);
var database = firebase.database();

//2. Adding the train schedule


//Button for adding new Amtrak schedule
$("#add-amtrak-btn").on("click",function(event) {
    event.preventDefault();

    //Grabs per input
    var trainName = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();


    //Creates local "temporary" object for holding train schedule
    var newAmtrak = {

        train: trainName,
        destination: destinationInput,
        firsttrain: firstTrainTime,
        frequency: frequencyInput

    };

    //Uploads Atrak schedule
    database.ref().push(newAmtrak);


    //Log on everything to console
    console.log(newAmtrak.train);
    console.log(newAmtrak.destination);
    console.log(newAmtrak.firsttrain);
    console.log(newAmtrak.frequency);

    alert("New Amtrak schedule successfully added");

    //Clear all the text box
    $("train-name-input").val("")
    $("destination-input").val("")
    $("first-train-input").val("")
    $("frequency-input").val("")

});

//3. Create Firebase event for adding Amtrak Schedule to the database and a row in the html when a user adds an entry

database.ref().on("child_added",function(childsnapshot) {
    console.log(childsnapshot.val());

    //Store everything into a value

    var trainName = childsnapshot.val().train;
    var destinationInput = childsnapshot.val().destination;
    var firstTrainTime = childsnapshot.val().firsttrain;
    var frequencyInput = childsnapshot.val().frequency;


//Input for the Minutes Away

    var firstTrainNew = moment(childsnapshot.val().firsttrain,"hh:mm")
    var diffTime = moment().diff(moment(firstTrainNew),"minutes");
    var remainder = diffTime.childsnapshot.val().frequency;
    var minsAway = childsnapshot.val().frequency - remainder;

    
//Employee info
    console.log(trainName);
    console.log(destinationInput);
    console.log(firstTrainTime);
    console.log(frequencyInput);

    
// Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationInput),
        $("<td>").text(firstTrainTime),
        $("<td>").text(frequencyInput),
        $("<td>").text(minsAway),
    
      );


      // Append the new row to the table
      $("#schedule-table > tbody").append(newRow);


});