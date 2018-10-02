$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBgv5NAMfItpVFdMD28bbIFq71GgSTsZyE",
    authDomain: "train-times-b5024.firebaseapp.com",
    databaseURL: "https://train-times-b5024.firebaseio.com",
    projectId: "train-times-b5024",
    storageBucket: "train-times-b5024.appspot.com",
    messagingSenderId: "1076573872746"
  };

  firebase.initializeApp(config);

  var database = firebase.database();


  //event listener to capture user input
  $(document).on("click", "button", function sendData(){
    event.preventDefault();

    //capture input
    var name = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var startTime = $("#train-first").val().trim();
    var frequency = $("#train-frequency").val().trim();

    //temporary object to organize inputs
    var newTrain = {
      name: name, 
      destination: destination, 
      firstTrain: startTime, 
      frequency: frequency
    };

    //push to database
    database.ref().push(newTrain);

    //clear user inputs from form
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-first").val("");
    $("#train-frequency").val("");    

  });

  //event listener to update train schedule
  database.ref().on("child_added", function(snapshot){
    var snapVal = snapshot.val();
  
    // Store data as variables for ease
    var newName = snapVal.name;
    var newDestination = snapVal.destination;
    var newFirst = snapVal.firstTrain;
    var newFrequency = snapVal.frequency;
    var now = moment().format("HH:mm");
  
    // Format First arrival time
    var newFirstFormatted = moment(newFirst, "HH:mm");

  
    // Calculate Time Elapsed since first train 
    var tElapsed = moment().diff(moment(newFirstFormatted), "minutes");

    //log to check values are correct
    console.log("time:"+ now);
    console.log("First Train: " + newFirst);
    console.log("elapsed:" + tElapsed);
   
    //calculate how many minutes since the last train (%)
    var remainder = tElapsed % newFrequency;
    console.log("r: " + remainder);  
  
    // Calculate time remaining until Next Train
    var newTRemaining = newFrequency - remainder;

    //Calculate next train arrival time
    var newNextTrain = moment().add(newTRemaining, "minutes").format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(newName),
      $("<td>").text(newDestination),
      $("<td>").text(newFrequency),
      $("<td>").text(newNextTrain),
      $("<td>").text(newTRemaining),
    );
  
    // Append the new row to the table
    $("#schedule-table > tbody").append(newRow);

  });
  
});