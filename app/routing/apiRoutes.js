// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");
// var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

//   app.get("/api/waitlist", function(req, res) {
//     res.json(waitListData);
//   });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
      friendsData.push(req.body);
      console.log(res.json(friendsData));


      // Convert the survey responses array from string to number format and push into the newScore array for comparison ti current scores in the friendsArray 
      var newScore = [];
      var answer = 0;
      for (i=0; i<10; i++) {
        answer = parseInt(req.body.scores[i])
        newScore.push(answer);
      }
      console.log("New Score Array: " + newScore)

     // Compare the new scores to the existing scores in friends.js, total up the differences and push the difference totals into an array
      sum = 0;
      sumOfDiffsArray = [];
      for(var j=0; j<10; j++) {

      for(var k=0; k < 10; k++) {
         sum += Math.abs(newScore[k]-friendsData[j].scores[k]);
         
      }
      sumOfDiffsArray.push(sum);
      sum = 0;
    }
    console.log("Sum of diffs Array: " + sumOfDiffsArray);

    // Get the lowest value from the total differences array and set this equal to the match variable
    var match = Math.min.apply(null, sumOfDiffsArray);
    
    console.log("Match: " + match);

    // var matchName = "";
    // var matchPhoto = "";
    // Loop through the total differences array to determine the index value of the match then set the name and photo variables equal to those of the match so the AJAX call can get these values via the data method.
    for (var l=0; l<10; l++) {

    if (match === sumOfDiffsArray[l]) {
        res.catName = friendsData[l].catName;
        res.photo = friendsData[l].photo;
    } else {
        l=l+1;
    }
}
console.log("catName: " + res.catName, "photoURL: " + res.photo);

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

//   app.post("/api/clear", function(req, res) {
//     // Empty out the arrays of data
//     tableData.length = [];
//     waitListData.length = [];

//     res.json({ ok: true });
//   });
};


// sum = 0;
// for(var i=0; i< newScore.length; i++) {
//    sum += Math.abs(newScore[i]-friendsData[0].scores[i]);
// }
// console.log("Sum of diffs: " + sum);