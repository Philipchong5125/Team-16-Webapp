const firebase = require("firebase");
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
admin.initializeApp();

var firebaseConfig = {
    apiKey: "AIzaSyB-Zz3DmQIDLTLtQdASMG1vvXgZjBUa-H8",
    authDomain: "meditation-app-9f8f1.firebaseapp.com",
    projectId: "meditation-app-9f8f1",
    storageBucket: "meditation-app-9f8f1.appspot.com",
    messagingSenderId: "456537085007",
    appId: "1:456537085007:web:41b5aeb2598ed5ed82063a"
  };
    
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); //add this to read/write

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wirimeditation@gmail.com',
        pass: 'Password88!'
    }
});


let sendEmail = function(dest) {
    const mailOptions = {
        from: 'WiRi <wirimeditation@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
        to: dest,
        subject: 'Meditation Reminder', // email subject
        html: `<p style="font-size: 16px;">You have a meditation session right now!!</p>
            <br />
        ` // email content in HTML
    };
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error){
           console.log(error.toString());
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

/** This schedules a job to be run every minute */
cron.schedule('0 * * * * *', () => {
    console.log('running every minute');
    /** This READS all the reminders from DB */
    db.collection("reminders").get().then((querySnapshot) => {

        // this loops through the reminders
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(`${doc.id} => activated = ${data.activated} , days = ${data.days}, time = ${data.time}`);

            // if the reminder is activated and the date and time maches current time, we should send an email
            if (data.activated && checkDate(data.days, data.time)) {
                console.log("sending an email to " + doc.id);
                sendEmail(doc.id);
            }
        });

    });

});

/**
 * returns true if the current time matches the time and
 * today existed in days array.
 * @param {*} days 
 * @param {*} time 
 */
function checkDate(days, time) {
    
    // if today does not exist in days array, means today was not set in the reminder
    if (days.indexOf(getToday()) == -1) {
        console.log("checkDate returns false: " + getToday());
        return false;
    }

    const currentTime = getCurrent24HourTime();
    console.log("checkDate, currentTime: " + currentTime);
    if (time === currentTime) {
        return true;
    } else {
        return false;
    }
}

/**
 * returns today as an integer, starting Monday as 0
 */
function getToday() {
    const toDate = new Date();
    const today = toDate.getDay();
    return (today + 6) % 7;
}

/**
 * returns the current 24 hour fomrat time in String
 */
function getCurrent24HourTime() {
    const toDate = new Date();
    let hours = toDate.getHours() % 12;
    if (hours == 0) {
        hours = 12;
    }
    const minutes = toDate.getMinutes();
    let minutesStr = minutes;
    if (minutes < 10) {
        minutesStr = "0" + minutesStr;
    }
    let ampm = "AM";
    if (toDate.getHours() >= 12) {
        ampm = "PM";
    }

    return hours + ":" + minutesStr + " " + ampm;
}

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
