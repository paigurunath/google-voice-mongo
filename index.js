'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');
const express = require('express')
const bodyParser = require('body-parser')

var Sequelize = require('sequelize');
 
//Setting up the config
var sequelize = new Sequelize('voice', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

// sequelize.authenticate().complete(function (err) {
//     if (err) {
//        console.log('There is connection in ERROR');
//     } else {
//        console.log('Connection has been established successfully');
//     }
//    });

var test = sequelize.authenticate()
    .then(function () {
        console.log("CONNECTED! ");
    })
    .catch(function (err) {
        console.log("SOMETHING DONE GOOFED");
    })
    .done();

    var VoiceData = sequelize.define('t', {
        j:Sequelize.TEXT
    });
// var config = require('./config/config');
// var mongoose = require('mongoose');
// var UserDetails = require('./models/UserDetails');

// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect(config.dbUrl);

// Instantiate the Dialogflow client.
const app = dialogflow();

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('WelcomeIntent', (conv) => {
    console.log(JSON.stringify(conv));
    console.log("1");

    // var item1 = VoiceData.build({
    //     data:conv
    // });
    // //Inserting Data into database
    // item1.save().complete(function (err) {
    //  if (err) {
    //     console.log('Error in Inserting Record');
    //  } else {
    //     console.log('Data successfully inserted');
    //  }
    // });

    VoiceData.create({
        j: JSON.stringify(conv)
    }).then(output => {
        console.log("Inserted 1");
    });

//     sequelize.sync().then(() => VoiceData.create({
//         j: JSON.stringify(conv)
//         })).then(jane => {
//     console.log(jane.toJSON());
//   });

    conv.ask('<speak> Welcome, here is the preview of simplify the complex with the Guide to Retirement'+
    '<audio src="https://am.jpmorgan.com/blob-gim/1383559729729/83456/WeeklyStory.mp3">did not get your audio file</audio>' +
    '<break time="2s"/>Do you want to continue Retirement Program Introduction ?' +
    '</speak>');
});

app.intent('ResumeIntent', (conv) => {
    console.log(JSON.stringify(conv));
    console.log("2");


    VoiceData.create({
        j: JSON.stringify(conv)
    }).then(output => {
        console.log("Inserted 2");
    });


    conv.ask('<speak><audio src="https://am.jpmorgan.com/blob-gim/1383421019357/83456/Slide_15_KR.mp3"></audio>'+
    '<break time="2s"/>would you like to hear more on retirement plans ? <break time="2s"/></speak>');
});

app.intent('StopIntent', (conv) => {
    console.log(JSON.stringify(conv));
    console.log("3");


    VoiceData.create({
        j: JSON.stringify(conv)
    }).then(output => {
        console.log("Inserted 3");
    });


    conv.close('Thank you, come back soon.');
});

app.intent('UserDetails', (conv, { mobile, email}) => {
    console.log(JSON.stringify(conv));
    console.log("4");

    VoiceData.create({
        j: JSON.stringify(conv)
    }).then(output => {
        console.log("Inserted 4");
    });


    console.log(mobile + ' is mobile number and ' + email + ' is email id.');

    // var UserDetailsObj = new UserDetails({
    //     "userId":conv.request.user.userId,
    //     "conversationId": conv.request.conversation.conversationId,
    //     "mobile" : mobile,
    //     "email": email,
    //     "timestamp": conv.request.user.lastSeen
    // }); 
      
    // console.log(JSON.stringify(UserDetailsObj));

    // UserDetailsObj.save(function(error) {
    //     console.log("Your UserDetailsObj has been saved!");
    // if (error) {
    //     console.error(error);
    //     }
    // });

    VoiceData.findOne({}).then(project => {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        console.log("----------------------------------------------------------------------------------");
        var testData = JSON.parse(project.j);
        console.log(project.id);
        console.log(testData.request.surface.capabilities);

        //console.log(JSON.stringify(project));
        console.log("----------------------------------------------------------------------------------");
      })
    conv.close('Thank you, come back soon.');
});

app.fallback((conv) => {
    conv.ask(`Sorry, I didn't get that.`);
});

const expressApp = express().use(bodyParser.json())
 
expressApp.post('/guidetoretirement', app)

 
// expressApp.listen(process.env.PORT);
expressApp.listen(80)
console.log("Server started and running on port!!! 80");