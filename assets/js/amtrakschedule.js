var addBtn = $("#add-amtrak-btn");
var trainName = $("#train-name-input");
var destinationInput = $("#destination-input");
var firstTrainTime = $("#first-train-input");
var frequencyInput = $("#frequency-input");
//2. Adding the train schedule

//Button for adding new Amtrak schedule
addBtn.on("click", function(event) {
  event.preventDefault();

  //Creates local "temporary" object for holding train schedule
  var newAmtrak = {
    train: trainName.val().trim(),
    destination: destinationInput.val().trim(),
    firsttrain: firstTrainTime.val().trim(),
    frequency: frequencyInput.val().trim()
  };

  console.log(newAmtrak);

  //Uploads Atrak schedule
  database.ref().push(newAmtrak);

  //Clear all the text box
  trainName.val("");
  destinationInput.val("");
  firstTrainTime.val("");
  frequencyInput.val("");

  alert("New Amtrak schedule successfully added");
});

//3. Create Firebase event for adding Amtrak Schedule to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childsnapshot) {
  var train = childsnapshot.val();
  console.log(train);

  //Input for the Minutes Away
  var freq = parseInt(train.frequency);
  var m_firstTrain = moment(train.firsttrain, "hh:mm A");
  var m_now = moment();
  var diffTime = m_now.diff(m_firstTrain, "minutes");
  var minsAway, nextTrainTime;

  if (diffTime < 0) {
    minsAway = diffTime;
    nextTrainTime = m_firstTrain.format("hh:mm A");
    console.log(train.train, "Train is in the future", minsAway, nextTrainTime);
  } else {
      
    var remainder = diffTime % freq;
    minsAway = freq - remainder;
    nextTrainTime = m_now.add(minsAway, "minutes").format("hh:mm A");
    console.log(train.train, remainder, minsAway, nextTrainTime);
  }



  //   //Employee info
  //   console.log(trainName);
  //   console.log(destinationInput);
  //   console.log(firstTrainTime);
  //   console.log(frequencyInput);

  // Create the new row
   var newRow = $("<tr>").append(
   $("<td>").text(trainName),
   $("<td>").text(destinationInput),
   $("<td>").text(firstTrainTime),
   $("<td>").text(frequencyInput),
   $("<td>").text(minsAway)
  );

  //   // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});
