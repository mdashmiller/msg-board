const functions = require('firebase-functions')

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Robo")
})

// https://firebase.google.com/docs/functions/write-firebase-functions
