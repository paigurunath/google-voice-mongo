'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');
const express = require('express')
const bodyParser = require('body-parser')

var config = require('./config/config');
var mongoose = require('mongoose');
var UserDetails = require('./models/UserDetails');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);

// Instantiate the Dialogflow client.
const app = dialogflow();

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('WelcomeIntent', (conv) => {
    console.log(JSON.stringify(conv));
    console.log("1");
    conv.ask('<speak> Welcome, here is the preview of simplify the complex with the Guide to Retirement'+
    '<audio src="https://am.jpmorgan.com/blob-gim/1383559729729/83456/WeeklyStory.mp3">did not get your audio file</audio>' +
    '<break time="2s"/>Do you want to continue Retirement Program Introduction ?' +
    '</speak>');
});

app.intent('ResumeIntent', (conv) => {
    console.log(JSON.stringify(conv));
    console.log("2");
    conv.ask('<speak><audio src="https://am.jpmorgan.com/blob-gim/1383421019357/83456/Slide_15_KR.mp3"></audio>'+
    '<break time="2s"/>would you like to hear more on retirement plans ? <break time="2s"/></speak>');
});

app.intent('StopIntent', (conv) => {
    console.log(JSON.stringify(conv));
    console.log("3");
    conv.close('Thank you, come back soon.');
});

app.intent('UserDetails', (conv, { mobile, email}) => {
    console.log(JSON.stringify(conv));
    console.log("4");
    console.log(mobile + ' is mobile number and ' + email + ' is email id.');

    var UserDetailsObj = new UserDetails({
        "userId":conv.request.user.userId,
        "conversationId": conv.request.conversation.conversationId,
        "mobile" : mobile,
        "email": email,
        "timestamp": conv.request.user.lastSeen
    }); 
      
    console.log(JSON.stringify(UserDetailsObj));

    UserDetailsObj.save(function(error) {
        console.log("Your UserDetailsObj has been saved!");
    if (error) {
        console.error(error);
        }
    });

    conv.close('Thank you, come back soon.');
});

app.fallback((conv) => {
    conv.ask(`Sorry, I didn't get that.`);
});

const expressApp = express().use(bodyParser.json())
 
expressApp.post('/guidetoretirement', app)

 
expressApp.listen(process.env.PORT);
// expressApp.listen(80)
console.log("Server started and running on port!!! 80");