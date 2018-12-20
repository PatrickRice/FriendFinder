# FriendFinder
This application allows users to fill in survey questions about their cat and based on the answers to those questions, a match is generated from the database with the result of the cat whose scores most closely match those of the survey completed by the user.

The value for each survey question response is compared with the value for that question from each survey result in the database and the difference between the two numbers is taken.  The total differences for all questions are added up and whichever cat from the database corresponds to the lowest total difference score is returned as the "best match".  The best match is displayed in a modal with the name and picture of the best match based on the user's survey results.

The name and photo link fields are required and all questions must be answered for the submit button click to actually submit the info on the survey page (an alert is displayed if text fields or questions are left incomplete and the user tries to submit the survey).  
