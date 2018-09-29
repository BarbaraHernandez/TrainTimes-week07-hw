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
    name = $("#train-name").val().trim();
    destination = $("#train-destination").val().trim();
    startTime = $("#train-first").val().trim();//need to format with moment
    frequency = $("#train-frequency").val().trim();

    //temporary object
    var newTrain = {
      name: name, 
      destination: destination, 
      firsTrain: startTime, 
      frequency: frequency
    };

    //push to database
    database.ref().push(newTrain);

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-first").val("");
    $("#train-frequency").val("");
    

  });

  database.ref().on("child_added", function(snapshot){
    var snapVal = snapshot.val();

  })

  
});