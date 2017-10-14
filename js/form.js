$(document).ready(function() {

	// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyCzByML8ZgOTgBjfR3XTPSD-rwbVjRJ4Ks",
    authDomain: "formreturned-fc2ec.firebaseapp.com",
    databaseURL: "https://formreturned-fc2ec.firebaseio.com",
    projectId: "formreturned-fc2ec",
    storageBucket: "formreturned-fc2ec.appspot.com",
    messagingSenderId: "644731342519"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

 

  // First Time (pushed back 1 year to make sure it comes before current time)
   
  // 2. Button for adding messages
  $("#btn").on("click", function(event) {
  		event.preventDefault();

	 // Grabs user input
	  var name = $("#name").val().trim();
	  var email = $("#email").val().trim();
	  var phone = $("#phone").val().trim();
	  var message = $("#msg").val().trim();

	  // Creates local "temporary" object for holding message data
	  var newMsg = {
	  	name: name,
	  	email: email,
	  	phone: phone,
	  	message: message
	  };

	  // Uploads message data to the database
  		database.ref().push(newMsg);


	   // Alert
  		alert("message successfully added");

	 // Clears all of the text-boxes
	  $("#name").val("");
	  $("#email").val("");
	  $("#phone").val("");
	  $("#msg").val("");
  	});

  	// 3. Create Firebase event for adding message to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  // Store everything into a variable.
	  var name = childSnapshot.val().name;
	  var email = childSnapshot.val().email;
	  var phone = childSnapshot.val().phone;
	  var message = childSnapshot.val().message;


	   // Declare variable
  		// 		var trainFreq;

  		// 		// Time is to be entered on the entry form
  		//  		 var firstTime = 0;

	 //   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	 //    console.log(firstTimeConverted);

	 //  // Current Time
	 //    var currentTime = moment();
	 //    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	 //  // Difference between the times
		// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		// console.log("DIFFERENCE IN TIME: " + diffTime);

		// // Time apart (remainder)
	 //    var tRemainder = diffTime % trainFreq;
	 //    console.log(tRemainder);

	 //    // Minute Until Train
	 //    var tMinutesTillTrain = trainFreq - tRemainder;
	 //    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	 //    // Next Train
	 //    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	 //    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


	  // Add each message's data into the table
	  $("#Message-table > tbody").append("<tr><td>" + name + "</td><td>" + email + "</td><td>" + phone + 
	   "</td><td>" + message + "</td></tr>");
	});
});