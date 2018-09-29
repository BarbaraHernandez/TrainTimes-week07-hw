$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDxervGDaIYj-YjnK_SDK-gGNrz4EgJdmI",
    authDomain: "train-schedule-b1160.firebaseapp.com",
    databaseURL: "https://train-schedule-b1160.firebaseio.com",
    projectId: "train-schedule-b1160",
    storageBucket: "train-schedule-b1160.appspot.com",
    messagingSenderId: "876468237987"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var name ="";
  var destination="";
  var startTime="";
  var frequency="";
  var next="";
  var tRemaining="";
  var currentTime="";

  function createRow() {
    $("tbody").append("<tr>" + "</tr>");
  }

  document.on("click", "button", function sendData(){
    event.preventDefault();

    //capture input
    name = $("#train-name").text().trim();
    destination = $("#train-destination").text().trim();
    startTime = $("#train-first").text().trim();
    frequency = $("#train-frequency").text().trim();
    newTrain = [name, destination, startTime, frequency];

    //function to push to firebase
    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: startTime,
      frequency: frequency
    });

  })
  
});